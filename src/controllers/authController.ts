import { Request, Response } from "express";
import { loginUserService } from "../services/authService";

const loginUserHandler = async (req: Request, res: Response) => {
  const login = await loginUserService();
  if (!login) {
    res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json({ message: "Login success" });
};

export { loginUserHandler };
