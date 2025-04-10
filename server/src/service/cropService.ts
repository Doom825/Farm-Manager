import dotenv from 'dotenv';
import db from '../models/index.js';
const { Crop, CropJournal, User  } = db;

dotenv.config();

const PERMA_BASE_URL = process.env.PERMA_API_BASE_URL;
const PERMA_KEY_ID = process.env.PERMA_API_KEY_ID!;
const PERMA_KEY_SECRET = process.env.PERMA_API_KEY_SECRET!;

class CropService {
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-permapeople-key-id': PERMA_KEY_ID,
      'x-permapeople-key-secret': PERMA_KEY_SECRET,
    };
  }

  // Get crops from API
  async getAllCrops(): Promise<any> {
    try {
      const response = await fetch(`${PERMA_BASE_URL}/plants`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch crops: ${response.statusText}`);
      }

      const data = await response.json();
      return data; // Expecting an object with a 'data' property that contains an array of crops
    } catch (error) {
      console.error('Error in cropService.getAllCrops:', error);
      throw error;
    }
  }

  // Fetch and save to DB
  async fetchAndSaveCrops(): Promise<void> {
    try {
      const response = await this.getAllCrops(); // Fetch the crop data
      console.log('API Response:', JSON.stringify(response, null, 2));  // Log the full response object

      // Extract crops data from 'plants' array
      const crops = Array.isArray(response.plants) ? response.plants : [response.plants];  // Access 'plants' array

      if (crops.length === 0) {
        console.log('No crops to save.');
        return;
      }

      // Loop through each crop and save it to the database
      for (const crop of crops) {
        const { id, name, slug } = crop;

        if (!id || !name || !slug) continue; // Skip if crop does not have these essential properties

        // Check if crop already exists in the database
        const existing = await Crop.findOne({ where: { crop_id: id } });
        if (existing) continue;  // Skip if crop already exists

        // Save new crop to the database
        await Crop.create({
          crop_id: id,
          crop_name: name,
          slug: slug,
        });
      }

      console.log('✅ Crops successfully saved to the database.');
    } catch (error) {
      console.error('❌ Error saving crops to database:', error);
    }
  }

  // Get crops by the user
  async getCropsByUser(userId: number) {
    try {
      // Query crops through the CropJournal (associating crops with the user)
      const crops = await Crop.findAll({
        include: [
          {
            model: CropJournal,
            where: { user_id: userId },  // Ensure the crops are related to this user
            include: [
              {
                model: User,  // Include the User to make sure the relationship is valid
                where: { user_id: userId },  // Make sure it's the correct user
              },
            ],
          },
        ],
      });
  
      if (crops.length === 0) {
        throw new Error('No crops found for this user');
      }
  
      return crops[0].crop_name;  // Return the crops associated with the user
    } catch (err) {
      console.error('Error fetching crops for user:', err);
      throw err;
    }
  }
  
  //add crop to a user's journal
  async addCropForUser(userId: number, cropId: number) {
    try {
      // Check if already exists
      const exists = await CropJournal.findOne({
        where: { user_id: userId, crop_id: cropId },
      });
  
      if (!exists) {
        await CropJournal.create({
          user_id: userId,
          crop_id: cropId,
          notes: '', // or null/default value if optional
        });
      }
  
      // Return updated list
      const updatedCrops = await this.getCropsByUser(userId);
      return updatedCrops;
    } catch (err) {
      console.error('Error adding crop for user:', err);
      throw err;
    }
  }
}

export default new CropService();