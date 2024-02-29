import prisma from "../utils/db";
import { compare } from "bcryptjs";
import { generateToken } from "../utils/jwt.utils";

export class AuthService {
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
}
