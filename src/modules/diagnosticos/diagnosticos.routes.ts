import { Router } from "express";
import { DiagnosticosController } from "./diagnosticos.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { CreateDiagnosticoSchema, UpdateDiagnosticoSchema } from "./diagnosticos.schema";

const diagnosticosRouter = Router();
const controller = new DiagnosticosController();

diagnosticosRouter.use(ensureAuthenticated);

/**
 * @swagger
 * tags:
 *   - name: Diagnósticos
 *     description: Gestão de diagnósticos médicos
 */

/**
 * @swagger
 * /diagnosticos:
 *   post:
 *     summary: Cria um novo diagnóstico
 *     tags: [Diagnósticos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ConsultaID, Titulo, Descricao]
 *             properties:
 *               ConsultaID:
 *                 type: integer
 *               Titulo:
 *                 type: string
 *               Descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Diagnóstico criado
 */
diagnosticosRouter.post("/", validate(CreateDiagnosticoSchema), controller.create);

/**
 * @swagger
 * /diagnosticos:
 *   get:
 *     summary: Lista todos os diagnósticos
 *     tags: [Diagnósticos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de diagnósticos
 */
diagnosticosRouter.get("/", controller.index);

/**
 * @swagger
 * /diagnosticos/{id}:
 *   get:
 *     summary: Obtém um diagnóstico pelo ID
 *     tags: [Diagnósticos]
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
 *         description: Detalhes do diagnóstico
 */
diagnosticosRouter.get("/:id", controller.show);

/**
 * @swagger
 * /diagnosticos/{id}:
 *   patch:
 *     summary: Atualiza um diagnóstico
 *     tags: [Diagnósticos]
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
 *               Titulo:
 *                 type: string
 *               Descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Diagnóstico atualizado
 */
diagnosticosRouter.patch("/:id", validate(UpdateDiagnosticoSchema), controller.update);

/**
 * @swagger
 * /diagnosticos/{id}:
 *   delete:
 *     summary: Remove um diagnóstico
 *     tags: [Diagnósticos]
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
 *         description: Diagnóstico removido
 */
diagnosticosRouter.delete("/:id", controller.delete);

export default diagnosticosRouter;
