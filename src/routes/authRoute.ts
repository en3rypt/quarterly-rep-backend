import { Router } from "express";
import { loginUserHandler } from "../controllers/authController";

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
authRouter.get("/login", loginUserHandler);

export default authRouter;
