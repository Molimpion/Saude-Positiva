import { Router } from "express";
import { PacienteController } from "./paciente.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware"; // Vamos criar este middleware genérico
import { CreatePacienteSchema, UpdatePacienteSchema } from "./paciente.schema";

const pacienteRouter = Router();
const controller = new PacienteController();

// Rotas de Pacientes
pacienteRouter.post("/", validate(CreatePacienteSchema), controller.create);
pacienteRouter.get("/", controller.index);
pacienteRouter.get("/:id", controller.show);
pacienteRouter.patch("/:id", validate(UpdatePacienteSchema), controller.update);

export default pacienteRouter;