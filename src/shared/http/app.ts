import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { ZodError } from "zod";

// Importação das rotas dos módulos
import pacienteRouter from "../../modules/pacientes/paciente.routes";

const app = express();

// Middlewares Globais
app.use(cors());
app.use(express.json());

// --- Rotas da Aplicação ---
// Aqui você registra os prefixos para cada módulo
app.use("/pacientes", pacienteRouter);

// Rota Raiz (Health Check)
app.get("/", (req, res) => {
  return res.json({ message: "Saúde Positiva API - Online 🚀" });
});

// --- Middleware Global de Tratamento de Erros ---
// Captura erros do Zod (validação) e erros gerais da aplicação
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    // 1. Erro de Validação do Zod
    if (error instanceof ZodError) {
      return response.status(400).json({
        status: "error",
        message: "Erro de validação nos dados enviados.",
        errors: error.issues, // Retorna os detalhes do que está errado
      });
    }

    // 2. Erros genéricos lançados com 'throw new Error(...)'
    if (error instanceof Error) {
      return response.status(400).json({
        status: "error",
        message: error.message,
      });
    }

    // 3. Erro interno desconhecido
    console.error(error); // Loga no terminal para o desenvolvedor ver
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

export { app };