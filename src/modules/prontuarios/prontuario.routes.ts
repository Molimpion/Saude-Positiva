import { Router } from "express";
import { ProntuarioController } from "./prontuario.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { CreateProntuarioSchema, UpdateProntuarioSchema } from "./prontuario.schema";

const prontuarioRouter = Router();
const controller = new ProntuarioController();

prontuarioRouter.use(ensureAuthenticated);

/**
 * @swagger
 * tags:
 *   - name: Prontuários
 *     description: Gestão de prontuários médicos
 */

/**
 * @swagger
 * /prontuarios:
 *   post:
 *     summary: Cria um novo prontuário
 *     tags: [Prontuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [PacienteID, QueixaPrincipal]
 *             properties:
 *               PacienteID:
 *                 type: integer
 *               MedicoResponsavelID:
 *                 type: integer
 *               QueixaPrincipal:
 *                 type: string
 *               HistoricoMedico:
 *                 type: string
 *     responses:
 *       201:
 *         description: Prontuário criado
 */
prontuarioRouter.post("/", validate(CreateProntuarioSchema), controller.create);

/**
 * @swagger
 * /prontuarios:
 *   get:
 *     summary: Lista todos os prontuários
 *     tags: [Prontuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de prontuários
 */
prontuarioRouter.get("/", controller.index);

/**
 * @swagger
 * /prontuarios/{id}:
 *   get:
 *     summary: Obtém um prontuário pelo ID
 *     tags: [Prontuários]
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
 *         description: Detalhes do prontuário
 */
prontuarioRouter.get("/:id", controller.show);

/**
 * @swagger
 * /prontuarios/{id}:
 *   patch:
 *     summary: Atualiza um prontuário
 *     tags: [Prontuários]
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
 *               QueixaPrincipal:
 *                 type: string
 *               HistoricoMedico:
 *                 type: string
 *               MedicoResponsavelID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Prontuário atualizado
 */
prontuarioRouter.patch("/:id", validate(UpdateProntuarioSchema), controller.update);

/**
 * @swagger
 * /prontuarios/{id}:
 *   delete:
 *     summary: Remove um prontuário
 *     tags: [Prontuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Prontuário removido
 */
prontuarioRouter.delete("/:id", controller.delete);

export default prontuarioRouter;
