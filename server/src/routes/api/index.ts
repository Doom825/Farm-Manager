import { Router } from "express";
import profileRouter from './profileRoutes.js';

const router = Router();

router.use('/profiles', profileRouter);

export default router;
