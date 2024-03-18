import prisma from "../utils/db";
import { compare } from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt.utils";
import { UserService } from "./user.service";
import { EmailService } from "./email.service";

export class AuthService {
  private readonly userService;
  private readonly emailService;

  constructor() {
    this.userService = new UserService();
    this.emailService = new EmailService();
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

  async setResetLink(email: string) {
    // const user = await this.userService.getUserByEmail(email);
    // if (!user) {
    //   return { status: "error", message: "User not found" };
    // }
    const resetToken = generateToken({ email: email }, "1h");
    // await this.userService.setResetToken(email, resetToken);
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const subject = "Quarterly Submission - Password Reset Link";
    const html = `<!DOCTYPE html>
                  <html>
                  <head>
                    <title>Password Reset</title>
                  </head>
                  <body>
                    <h1>Reset Your Password</h1>

                    <p>Click the link below to reset your password. This link will be valid for one hour.</p>

                    <a href="${resetLink}">Reset Password</a>

                    <p>If you did not request a password reset, please ignore this email.</p>
                  </body>
                  </html>`;
    await this.emailService.sendEmail(email, subject, html);

    return { status: "success", message: `Reset link sent to ${email} email` };
  }

  async resetPassword(email: string, newPassword: string) {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        return { status: "error", message: "User not found" };
      }

      const token = user.resetToken;
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
