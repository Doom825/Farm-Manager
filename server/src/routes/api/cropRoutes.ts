import express from 'express';
import cropService from '../../service/cropService.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const crops = await cropService.getAllCrops();
    
    // Check if crops is a CropResponse object
    if (Array.isArray(crops)) {
      console.log('Crops fetched:', crops.length);
      res.json(crops);
    } else if (crops.data) {
      console.log('Crops fetched:', crops.data.length);
      res.json(crops.data);  // Access the data array from the CropResponse
    } else {
      res.status(400).send('Invalid crop data format.');
    }
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).send('Error fetching crops');
  }
});

// New route to get crops for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    // Convert the userId from string to number
    const userId = parseInt(req.params.userId, 10);
    const crops = await cropService.getCropsByUser(userId);
    
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    if (crops.length === 0) {
      return res.status(404).json({ message: 'No crops found for this user' });
    }
    
    return res.json(crops);  // Ensure this line returns a response
  } catch (error) {
    console.error('Error fetching crops:', error);
    return res.status(500).json({ error: 'Failed to fetch crops for this user.' });
  }
});

router.post('/add/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { cropId } = req.body;

  try {
    const updatedCrops = await cropService.addCropForUser(userId, cropId);
    res.json(updatedCrops);
  } catch (error) {
    console.error('Error adding crop for user:', error);
    res.status(500).json({ error: 'Failed to add crop for this user.' });
  }
});

export default router;