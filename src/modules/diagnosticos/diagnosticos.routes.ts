// diagnosticos.routes.ts
import { Router } from "express";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { validate } from "../../shared/http/middlewares/validate.middleware";

import { DiagnosticosController } from "./diagnosticos.controller";
import {
  CreateDiagnosticoSchema,
  UpdateDiagnosticoSchema,
  ShowOrDeleteDiagnosticoSchema,
} from "./diagnosticos.schema";

const router = Router();
const controller = new DiagnosticosController();

// 🔒 TODAS AS ROTAS ABAIXO EXIGEM LOGIN
router.use(ensureAuthenticated);

router.post("/", validate(CreateDiagnosticoSchema), controller.create);
router.get("/", controller.index);
router.get("/:id", validate(ShowOrDeleteDiagnosticoSchema), controller.show);
router.patch("/:id", validate(UpdateDiagnosticoSchema), controller.update);
router.delete("/:id", validate(ShowOrDeleteDiagnosticoSchema), controller.delete);

export default router;

