import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();
export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await authService.login(email, password);
      if (!result) {
        return res.status(404).json({ message: "Invalid email/password" });
      }
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
