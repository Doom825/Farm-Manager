import {Router} from 'express';
import cropService from '../../service/cropService.js';

const router = Router();

router.get('/', async (_req, res) => {
  console.log('Request received at /api/crops');

  try {
    const crops = await cropService.getAllCrops();
    console.log('Crops fetched:', crops.length);
    res.json(crops);
  } catch (err) {
    console.error('Error fetching crops:', err); 
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});

export default router;