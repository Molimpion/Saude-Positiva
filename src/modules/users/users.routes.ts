import { Router } from "express";
import { UsersController } from "./users.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { CreateUserSchema, UpdateUserSchema } from "./users.schema";

const userRouter = Router();
const controller = new UsersController();

userRouter.use(ensureAuthenticated);

userRouter.post("/", validate(CreateUserSchema), controller.create);
userRouter.get("/", controller.index);
userRouter.get("/:id", controller.show);
userRouter.patch("/:id", validate(UpdateUserSchema), controller.update);
userRouter.delete("/:id", controller.delete);

export default userRouter;