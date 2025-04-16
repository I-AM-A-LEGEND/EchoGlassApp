import { Router } from "express";
import authRoutes from "./auth.routes";
import multimodalRoutes from "./multimodal.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/multimodal", multimodalRoutes);

export default router;
