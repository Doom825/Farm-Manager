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
    res.json(crops);
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({ error: 'Failed to fetch crops for this user.' });
  }
});

export default router;