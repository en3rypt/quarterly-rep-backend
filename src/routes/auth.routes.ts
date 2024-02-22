import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authController = new AuthController();
const authRouter = Router();

/**
 * @openapi
 * /auth/login:
 *  get:
 *      summary: Login user
 *      description: Login user
 *      responses:
 *          200:
 *              description: Login success
 *          401:
 *              description: Unauthorized
 *          501:
 *              description: Not implemented
 *
 */
authRouter.post("/login", authController.login);

export default authRouter;
