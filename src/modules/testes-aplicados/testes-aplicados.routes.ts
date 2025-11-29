// testes-aplicados.routes.ts
import { Router } from "express";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { validate } from "../../shared/http/middlewares/validate.middleware";

import { TestesAplicadosController } from "./testes-aplicados.controller";
import {
  CreateTesteAplicadoSchema,
  UpdateTesteAplicadoSchema,
  ShowOrDeleteTesteAplicadoSchema
} from "./testes-aplicados.schema";

const router = Router();
const controller = new TestesAplicadosController();

// 🔒 TODAS AS ROTAS ABAIXO SÃO PROTEGIDAS
router.use(ensureAuthenticated);

router.post("/", validate(CreateTesteAplicadoSchema), controller.create);
router.get("/", controller.index);
router.get("/:id", validate(ShowOrDeleteTesteAplicadoSchema), controller.show);
router.patch("/:id", validate(UpdateTesteAplicadoSchema), controller.update);
router.delete("/:id", validate(ShowOrDeleteTesteAplicadoSchema), controller.delete);

export default router;

