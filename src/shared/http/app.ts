import "express-async-errors";
import express, { Request, Response } from "express";
import cors from "cors";

// --- Importação das Rotas ---
import authRouter from "../../modules/auth/auth.routes";
import pacienteRouter from "../../modules/pacientes/paciente.routes";
import medicoRouter from "../../modules/medicos/medicos.routes";
import prontuarioRouter from "../../modules/prontuarios/prontuario.routes";
import consultaRouter from "../../modules/consultas/consultas.routes";
import diagnosticoRouter from "../../modules/diagnosticos/diagnosticos.routes";
import testesRouter from "../../modules/testes-aplicados/testes-aplicados.routes";
import documentosRouter from "../../modules/documentos/documentos.routes";
import userRouter from "../../modules/users/users.routes";

import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

// --- Registro das Rotas ---

// 1. Públicas
app.use("/auth", authRouter);

// 2. Protegidas (Auth Middleware está dentro de cada arquivo de rota)
app.use("/pacientes", pacienteRouter);
app.use("/medicos", medicoRouter);
app.use("/prontuarios", prontuarioRouter);
app.use("/consultas", consultaRouter);
app.use("/diagnosticos", diagnosticoRouter);
app.use("/testes-aplicados", testesRouter);
app.use("/documentos", documentosRouter);
// app.use("/users", userRouter); // (Sua tarefa)

// 3. Health Check
app.get("/", (req: Request, res: Response) => {
  return res.json({ 
    message: "Saúde Positiva API is running!",
    version: "1.0.0"
  });
});

// --- Tratamento de Erros Global ---
app.use(errorMiddleware);

export { app };