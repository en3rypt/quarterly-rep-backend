import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import { jwtAuthMiddleware } from "../middleware/jwtAuth.middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", jwtAuthMiddleware, userRouter);
export default router;
