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

  async sendResetLink(req: Request, res: Response){
    const { email } = req.body;
    try {
      const result = await authService.setResetLink(email);
      if (!result) {
        return res.status(404).json({ message: "Invalid email" });
      }
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async resetPassword(req: Request, res: Response){
    const { email, newPassword } = req.body;
    try {
      const result = await authService.resetPassword(email, newPassword);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
