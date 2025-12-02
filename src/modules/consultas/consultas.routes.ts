import { Router } from "express";
import { ConsultaController } from "./consultas.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { CreateConsultaSchema, UpdateConsultaSchema } from "./consultas.schema";

const consultaRouter = Router();
const controller = new ConsultaController();

consultaRouter.use(ensureAuthenticated);

consultaRouter.post("/", validate(CreateConsultaSchema), controller.create);
consultaRouter.get("/", controller.index);
consultaRouter.get("/:id", controller.show);
consultaRouter.patch("/:id", validate(UpdateConsultaSchema), controller.update);
consultaRouter.delete("/:id", controller.delete);

export default consultaRouter;