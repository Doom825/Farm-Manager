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

export default router;