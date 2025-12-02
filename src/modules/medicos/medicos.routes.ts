import { Router } from "express";
import { MedicoController } from "./medicos.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { CreateMedicoSchema, UpdateMedicoSchema } from "./medicos.schema";

const medicoRouter = Router();
const controller = new MedicoController();


medicoRouter.use(ensureAuthenticated);

medicoRouter.post("/", validate(CreateMedicoSchema), controller.create);
medicoRouter.get("/", controller.index);
medicoRouter.get("/:id", controller.show);
medicoRouter.patch("/:id", validate(UpdateMedicoSchema), controller.update);

export default medicoRouter;