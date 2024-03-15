import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { AppError } from "../utils/errorHandler";
import { Role } from "../enums/role.enum";
import { SubmissionService } from "./submission.service";
import { QuarterServices } from "./quarters.service";

const prisma = new PrismaClient();
const submission  = new SubmissionService()
const quatersCreator = new QuarterServices()

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
    order = parseInt(order.toString()) || 0;
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        department,
        order,
      },
    });

    const currentYear = new Date().getFullYear();
    const today = new Date()
    const currentQuarter = (await quatersCreator.getQuarterByYear(currentYear)).filter((date) => date.endDate > today)[0].quarter

    for (let quarter = currentQuarter; quarter <= 4; quarter++){ 
      var status = "NOT_STARTED"
      if (quarter === currentQuarter){
          status = "PENDING"
        }
        await submission.createSubmission(email,quarter,currentYear,status)
      }
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
      where: {
        role: Role.REPRESENTATIVE,
      },
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

  async updateUserOrder(email: string, order: number) {
    order = parseInt(order.toString(), 10) || 0;
    return await prisma.user.update({
      where: { email },
      data: { order },
    });
  }
}
