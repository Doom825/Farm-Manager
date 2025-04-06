import { Router } from "express";
import apiRoutes from "./api/index.js";
import authRoutes from "./authRoutes.js";

const router = Router();

router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

export default router;
