import { Router } from "express";
import { TestesAplicadosController } from "./testes-aplicados.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { CreateTesteAplicadoSchema, UpdateTesteAplicadoSchema } from "./testes-aplicados.schema";

const testesRouter = Router();
const controller = new TestesAplicadosController();

testesRouter.use(ensureAuthenticated);

testesRouter.post("/", validate(CreateTesteAplicadoSchema), controller.create);
testesRouter.get("/", controller.index);
testesRouter.get("/:id", controller.show);
testesRouter.patch("/:id", validate(UpdateTesteAplicadoSchema), controller.update);
testesRouter.delete("/:id", controller.delete);

export default testesRouter;