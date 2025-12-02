import { Router } from "express";
import { ProntuarioController } from "./prontuario.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { CreateProntuarioSchema, UpdateProntuarioSchema } from "./prontuario.schema";

const prontuarioRouter = Router();
const controller = new ProntuarioController();

// 🔒 Rotas Protegidas
prontuarioRouter.use(ensureAuthenticated);

prontuarioRouter.post("/", validate(CreateProntuarioSchema), controller.create);
prontuarioRouter.get("/", controller.index);
prontuarioRouter.get("/:id", controller.show);
prontuarioRouter.patch("/:id", validate(UpdateProntuarioSchema), controller.update);
prontuarioRouter.delete("/:id", controller.delete);

export default prontuarioRouter;