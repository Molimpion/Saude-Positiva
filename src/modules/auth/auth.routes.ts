import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { LoginSchema, RegisterSchema } from "./auth.schema";

const authRouter = Router();
const controller = new AuthController();

authRouter.post("/login", validate(LoginSchema), controller.login);
authRouter.post("/register", validate(RegisterSchema), controller.register);

export default authRouter;