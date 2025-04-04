import express from 'express';
import type { Request, Response} from 'express';
import { Feedback } from '../../models/index.js';

const router = express.Router();

// GET /feedback - Get all feedback
router.get('/', async (_req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /feedback/:id - Get feedback by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).json({ error: 'Feedback not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /feedback - Create new feedback
router.post('/', async (req: Request, res: Response) => {
  try {
    const newFeedback = await Feedback.create(req.body);
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export { router as feedbackRouter };
