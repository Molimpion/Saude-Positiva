import { Router } from "express";
import { MedicoController } from "./medicos.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { CreateMedicoSchema, UpdateMedicoSchema } from "./medicos.schema";

const medicoRouter = Router();
const controller = new MedicoController();

medicoRouter.use(ensureAuthenticated);

/**
 * @swagger
 * tags:
 *   - name: Médicos
 *     description: Gestão de médicos
 */

/**
 * @swagger
 * /medicos:
 *   post:
 *     summary: Cadastra um novo médico
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [NomeCompleto, CRM, Especialidade]
 *             properties:
 *               NomeCompleto:
 *                 type: string
 *               CRM:
 *                 type: string
 *               Especialidade:
 *                 type: string
 *               Telefone:
 *                 type: string
 *               Email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Médico criado
 */
medicoRouter.post("/", validate(CreateMedicoSchema), controller.create);

/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Lista todos os médicos
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de médicos
 */
medicoRouter.get("/", controller.index);

/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     summary: Obtém um médico pelo ID
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do médico
 */
medicoRouter.get("/:id", controller.show);

/**
 * @swagger
 * /medicos/{id}:
 *   patch:
 *     summary: Atualiza um médico
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NomeCompleto:
 *                 type: string
 *               Especialidade:
 *                 type: string
 *               Telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Médico atualizado
 */
medicoRouter.patch("/:id", validate(UpdateMedicoSchema), controller.update);

export default medicoRouter;
