import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { AppError } from "../utils/errorHandler";

const prisma = new PrismaClient();

export class UserService {
  async createUser(
    email: string,
    role: string,
    department: string,
    order: number,
    password?: string
  ) {
    const randomPassword = password ?? Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        department,
        order,
      },
    });

    return user;
  }

  async updateUserPassword(email: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
  }

  async deleteUser(email: string) {
    return await prisma.user.delete({ where: { email } });
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async getAllUsers() {
    return await prisma.user.findMany();
  }

  async getByOrder() {
    return await prisma.user.findMany({
      orderBy: {
        order: "asc",
      },
    });
  }

  async getAllDepartmentAndOrder() {
    return await prisma.user.findMany({
      select: {
        department: true,
        order: true,
      },
    });
  }
}
