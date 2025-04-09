import { Router } from "express";
import profileRouter from './profileRoutes.js';
import cropRoutes from './cropRoutes.js'

const router = Router();

router.use('/profiles', profileRouter);
router.use('/crops', cropRoutes)

export default router;
