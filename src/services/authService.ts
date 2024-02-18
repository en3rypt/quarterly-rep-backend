import { AppError } from "../utils/errorHandler";
import prisma from "../utils/db";
import { User } from "@prisma/client";

export const loginUserService = async (): Promise<User[]> => {
  const users: User[] = await prisma.user.findMany();
  return users;
};
