import dotenv from 'dotenv';
dotenv.config();

const PERMA_BASE_URL = process.env.PERMA_API_BASE_URL;
const PERMA_KEY_ID = process.env.PERMA_API_KEY_ID!;
const PERMA_KEY_SECRET = process.env.PERMA_API_KEY_SECRET!;

class cropService {
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-permapeople-key-id': PERMA_KEY_ID,
      'x-permapeople-key-secret': PERMA_KEY_SECRET,
    };
  }

  async getAllCrops(): Promise<any> {
    try {
      const response = await fetch(`${PERMA_BASE_URL}/plants`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch crops: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in cropService.getAllCrops:', error);
      throw error;
    }
  }

  // Optional: get a specific plant by ID
  async getCropById(id: string): Promise<any> {
    try {
      const response = await fetch(`${PERMA_BASE_URL}/plants/${id}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch crop with ID ${id}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getCropById:', error);
      throw error;
    }
  }
}

export default new cropService();