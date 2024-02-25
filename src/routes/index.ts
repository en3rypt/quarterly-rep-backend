import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import quarterRouter from "./quarter.routes";
import submissionRouter from "./submission.routes";
import { jwtAuthMiddleware } from "../middleware/jwtAuth.middleware";
import { authorize } from "../middleware/roleAuth.middleware";
import { Role } from "../enums/role.enum";
const router = Router();

router.use("/auth", authRouter);
router.use("/user", jwtAuthMiddleware, userRouter);
router.use("/quarter", jwtAuthMiddleware, authorize(Role.ADMIN), quarterRouter);
router.use("/submission", jwtAuthMiddleware, submissionRouter);

export default router;
