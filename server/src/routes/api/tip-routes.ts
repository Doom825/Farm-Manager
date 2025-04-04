import express from 'express';
import { Request, Response } from 'express';
import { Tip } from '../../models/index.js';

const router = express.Router();

// GET /tips - Get all tips
router.get('/', async (_req: Request, res: Response) => {
  try {
    const tips = await Tip.findAll();
    res.status(200).json(tips);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /tips/:id - Get tip by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const tip = await Tip.findByPk(req.params.id);
    if (tip) {
      res.status(200).json(tip);
    } else {
      res.status(404).json({ error: 'Tip not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /tips - Create new tip
router.post('/', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const newTip = await Tip.create(req.body);
    res.status(201).json(newTip);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export { router as tipRouter };
