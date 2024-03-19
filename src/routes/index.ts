import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import quarterRouter from "./quarter.routes";
import submissionRouter from "./submission.routes";
import { jwtAuthMiddleware } from "../middleware/jwtAuth.middleware";
import { authorize } from "../middleware/roleAuth.middleware";
import { Role } from "../enums/role.enum";
const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/user", jwtAuthMiddleware, userRouter);
router.use("/api/quarter", jwtAuthMiddleware, quarterRouter);
router.use("/api/submission", jwtAuthMiddleware, submissionRouter);

export default router;
