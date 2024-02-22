import { sign, verify } from "jsonwebtoken";
import { config } from "dotenv";

config(); // Load environment variables

export function generateToken(payload: any) {
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  try {
    return verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return null;
  }
}
