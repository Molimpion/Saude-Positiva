// documentos.routes.ts
import { Router } from "express";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { validate } from "../../shared/http/middlewares/validate.middleware";

import { DocumentosController } from "./documentos.controller";
import {
  CreateDocumentoSchema,
  UpdateDocumentoSchema,
  ShowOrDeleteDocumentoSchema,
} from "./documentos.schema";

const router = Router();
const controller = new DocumentosController();

// 🔒 Todas as rotas abaixo exigem login
router.use(ensureAuthenticated);

router.post("/", validate(CreateDocumentoSchema), controller.create);
router.get("/", controller.index);
router.get("/:id", validate(ShowOrDeleteDocumentoSchema), controller.show);
router.patch("/:id", validate(UpdateDocumentoSchema), controller.update);
router.delete("/:id", validate(ShowOrDeleteDocumentoSchema), controller.delete);

export default router;

