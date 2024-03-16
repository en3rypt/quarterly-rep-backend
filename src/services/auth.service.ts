import prisma from "../utils/db";
import { compare } from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt.utils";
import { UserService } from "./user.service";

export class AuthService {

  private readonly userService;

  constructor() {
    this.userService = new UserService();
  }

  async login(
    email: string,
    password: string
  ): Promise<{
    userObject: { email: string; role: string };
    token: string;
  } | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await compare(password, user.password))) {
      return null;
    }

    const userObject = {
      email: user.email,
      role: user.role,
      department: user.department,
      order: user.order,
    };
    const token = generateToken(userObject);
    return { userObject, token };
  }

  async setResetLink(email: string){
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const resetLink = generateToken({email: user.email}, "1h");

    await this.userService.setResetToken(email, resetLink);

    return {resetLink};
  }

  async resetPassword(email: string, newPassword: string){
    try {
      
      const user = await this.userService.getUserByEmail(email);
      
      if (!user) {
        return { status: "error", message: "User not found" };
      }
      
      const token = user.resetToken
      if (!token || token === "" || token === null || !verifyToken(token)) {
        return { status: "error", message: "Invalid token" };
      }
      await this.userService.updateUserPassword(email, newPassword);
      await this.userService.deleteResetToken(email);
    
      return { status: "success", message: "Password updated Successfully!" };
    } catch (err) {
      return { status: "error", message: "Invalid token or error" };
    }
  }
}
