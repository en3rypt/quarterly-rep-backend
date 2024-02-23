import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authorize } from "../middleware/roleAuth.middleware";
import { Role } from "../enums/role.enum";

const userController = new UserController();
const userRouter = Router();

userRouter.post("/", authorize(Role.ADMIN), userController.createUser);
userRouter.put("/", userController.updateUser);
userRouter.delete("/", userController.deleteUser);
userRouter.get("/:email", userController.getUserByEmail);
userRouter.get("/", userController.getAllUsers);

export default userRouter;
