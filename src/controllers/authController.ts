import { Request, Response } from "express";
import { loginUserService } from "../services/authService";

const loginUserHandler = (req: Request, res: Response) => {
  const login: boolean = loginUserService();
  if (!login) {
    res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json({ message: "Login success" });
};

export { loginUserHandler };
