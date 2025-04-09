import express from 'express';
import cropService from '../../service/cropService.js';

const router = express.Router();

router.get('/crops', async (_req, res) => {
  try {
    const crops = await cropService.getAllCrops();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch crops' });
  }
});

export default router;