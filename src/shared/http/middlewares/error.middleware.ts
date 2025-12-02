import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { ZodError } from "zod";

export const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // 1. Erro de Negócio (gerado por nós com 'throw new AppError')
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  // 2. Erro de Validação (gerado pelo Zod)
  if (error instanceof ZodError) {
    return response.status(400).json({
      status: "error",
      message: "Erro de validação",
      issues: error.format(), // Detalha quais campos estão errados
    });
  }

  // 3. Erro Inesperado (Bugs, Banco fora do ar, etc)
  console.error(error); // Loga no terminal para debug
  
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};