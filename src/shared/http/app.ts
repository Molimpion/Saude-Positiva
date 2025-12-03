import "express-async-errors";
import express, { Request, Response } from "express";
import cors from "cors";
import { apiReference } from "@scalar/express-api-reference";
import { swaggerSpec } from "../config/swagger";

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

app.use(
  "/docs",
  apiReference({
    theme: 'purple',
    spec: {
      content: swaggerSpec,
    },
  })
);

app.use("/auth", authRouter);
app.use("/pacientes", pacienteRouter);
app.use("/medicos", medicoRouter);
app.use("/prontuarios", prontuarioRouter);
app.use("/consultas", consultaRouter);
app.use("/diagnosticos", diagnosticoRouter);
app.use("/testes-aplicados", testesRouter);
app.use("/documentos", documentosRouter);
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  return res.json({ 
    message: "Saúde Positiva API is running!",
    docs: "http://localhost:3000/docs",
    version: "1.0.0"
  });
});

app.use(errorMiddleware);

export { app };