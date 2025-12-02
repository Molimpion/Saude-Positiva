import { Router } from "express";
import { DiagnosticosController } from "./diagnosticos.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { CreateDiagnosticoSchema, UpdateDiagnosticoSchema } from "./diagnosticos.schema";

const diagnosticosRouter = Router();
const controller = new DiagnosticosController();

// 🔒 Rotas Protegidas
diagnosticosRouter.use(ensureAuthenticated);

diagnosticosRouter.post("/", validate(CreateDiagnosticoSchema), controller.create);
diagnosticosRouter.get("/", controller.index);
diagnosticosRouter.get("/:id", controller.show);
diagnosticosRouter.patch("/:id", validate(UpdateDiagnosticoSchema), controller.update);
diagnosticosRouter.delete("/:id", controller.delete);

export default diagnosticosRouter;