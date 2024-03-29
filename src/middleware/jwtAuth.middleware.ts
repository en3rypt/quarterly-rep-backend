import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { UserService } from "../services/user.service";
import { JwtPayload } from "../interface/jwt.interface";
const prisma = new PrismaClient();
const userService = new UserService();

export async function jwtAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await userService.getUserByEmail(decoded.email);

    if (!user) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    req.user = {
      email: decoded.email,
      role: decoded.role,
      department: user.department,
      order: user.order,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
