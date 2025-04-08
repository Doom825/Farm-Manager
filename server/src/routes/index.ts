import { Router } from "express";
import apiRoutes from "./api/index";
import authRoutes from "./authRoutes";

const router = Router();

router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

export default router;
