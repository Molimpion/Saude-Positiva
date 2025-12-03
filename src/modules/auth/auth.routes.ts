import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { LoginSchema, RegisterSchema } from "./auth.schema";

const authRouter = Router();
const controller = new AuthController();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticação de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário (Admin)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Usuário registado com sucesso
 *       400:
 *         description: Erro de validação
 */
authRouter.post("/register", validate(RegisterSchema), controller.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login no sistema
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 */
authRouter.post("/login", validate(LoginSchema), controller.login);

export default authRouter;
