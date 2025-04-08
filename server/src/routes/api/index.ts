import { Router } from "express";
import profileRouter from './profileRoutes';

const router = Router();

router.use('/profiles', profileRouter);

export default router;
