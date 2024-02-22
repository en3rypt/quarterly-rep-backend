import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userController = new UserController();
const userRouter = Router();

userRouter.post("/", userController.createUser);
userRouter.put("/", userController.updateUser);
userRouter.delete("/", userController.deleteUser);
userRouter.get("/:email", userController.getUserByEmail);
userRouter.get("/", userController.getAllUsers);

export default userRouter;
