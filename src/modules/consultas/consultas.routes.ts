import { Router } from "express";
import { ConsultaController } from "./consultas.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { CreateConsultaSchema, UpdateConsultaSchema } from "./consultas.schema";

const consultaRouter = Router();
const controller = new ConsultaController();

consultaRouter.use(ensureAuthenticated);

/**
 * @swagger
 * tags:
 *   - name: Consultas
 *     description: Agendamento e gestão de consultas
 */

/**
 * @swagger
 * /consultas:
 *   post:
 *     summary: Cria uma nova consulta
 *     tags: [Consultas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [PacienteID, MedicoID, Data, Hora]
 *             properties:
 *               PacienteID:
 *                 type: integer
 *               MedicoID:
 *                 type: integer
 *               ProntuarioID:
 *                 type: integer
 *               Data:
 *                 type: string
 *                 format: date
 *                 example: "2023-12-25"
 *               Hora:
 *                 type: string
 *                 example: "14:30"
 *               Motivo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Consulta agendada
 */
consultaRouter.post("/", validate(CreateConsultaSchema), controller.create);

/**
 * @swagger
 * /consultas:
 *   get:
 *     summary: Lista todas as consultas
 *     tags: [Consultas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de consultas
 */
consultaRouter.get("/", controller.index);

/**
 * @swagger
 * /consultas/{id}:
 *   get:
 *     summary: Obtém uma consulta pelo ID
 *     tags: [Consultas]
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
 *         description: Detalhes da consulta
 */
consultaRouter.get("/:id", controller.show);

/**
 * @swagger
 * /consultas/{id}:
 *   patch:
 *     summary: Atualiza uma consulta (Data, Hora, Motivo)
 *     tags: [Consultas]
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
 *               Data:
 *                 type: string
 *                 format: date
 *               Hora:
 *                 type: string
 *               Motivo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Consulta atualizada
 */
consultaRouter.patch("/:id", validate(UpdateConsultaSchema), controller.update);

/**
 * @swagger
 * /consultas/{id}:
 *   delete:
 *     summary: Remove uma consulta
 *     tags: [Consultas]
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
 *         description: Consulta removida
 */
consultaRouter.delete("/:id", controller.delete);

export default consultaRouter;
