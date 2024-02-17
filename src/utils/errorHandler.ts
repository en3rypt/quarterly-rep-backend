import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import logger from "./logger";

export class AppError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err);

  const statusCode = err.statusCode || 500;
  const status = statusCode.toString().startsWith("4") ? "fail" : "error";
  const message = err.message || "Oops! Something went wrong";

  res.status(statusCode).json({ statusCode, status, message });
};

export default errorHandler;
