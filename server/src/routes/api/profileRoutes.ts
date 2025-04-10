import { Router } from 'express';
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../../models/index.js';

const { User } = db;

const router = Router();

// CREATE a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    newUser.password = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create(newUser);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
