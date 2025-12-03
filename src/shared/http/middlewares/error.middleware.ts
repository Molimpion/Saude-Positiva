import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { ZodError } from "zod";

export const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      status: "error",
      message: "Erro de validação",
      issues: error.format(),
    });
  }

  console.error(error);
  
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};