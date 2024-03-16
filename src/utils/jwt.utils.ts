import { sign, verify } from "jsonwebtoken";
import { config } from "dotenv";

config(); // Load environment variables

export function generateToken(payload: any, expiresIn = "24h") {
  return sign(payload, process.env.JWT_SECRET!, { expiresIn });
}

export function verifyToken(token: string) {  
  try {
    verify(token, process.env.JWT_SECRET!);
    return true
  } catch (error) {
    throw new Error('Invalid token');
  }
}

