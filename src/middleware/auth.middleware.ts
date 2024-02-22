import { Request, Response, NextFunction } from "express";
import { expressjwt } from "express-jwt";
import { verifyToken } from "../utils/jwt.utils";

export const authMiddleware = expressjwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ["HS256"],
  requestProperty: "auth",
  getToken: (req) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    return undefined;
  },
});

export function jwtErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Invalid or missing token" });
  } else {
    next(err); // Delegate other errors to your general error handler
  }
}
