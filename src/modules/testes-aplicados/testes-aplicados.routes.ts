import { Router } from "express";
import { TestesAplicadosController } from "./testes-aplicados.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { CreateTesteAplicadoSchema, UpdateTesteAplicadoSchema } from "./testes-aplicados.schema";

const testesRouter = Router();
const controller = new TestesAplicadosController();

testesRouter.use(ensureAuthenticated);

/**
 * @swagger
 * tags:
 *   - name: Testes Aplicados
 *     description: Gestão de testes e exames
 */

/**
 * @swagger
 * /testes-aplicados:
 *   post:
 *     summary: Regista um novo teste aplicado
 *     tags: [Testes Aplicados]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [Nome, Resultado]
 *             properties:
 *               ConsultaID:
 *                 type: integer
 *               Nome:
 *                 type: string
 *               Descricao:
 *                 type: string
 *               Resultado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Teste registado
 */
testesRouter.post("/", validate(CreateTesteAplicadoSchema), controller.create);

/**
 * @swagger
 * /testes-aplicados:
 *   get:
 *     summary: Lista todos os testes aplicados
 *     tags: [Testes Aplicados]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de testes
 */
testesRouter.get("/", controller.index);

/**
 * @swagger
 * /testes-aplicados/{id}:
 *   get:
 *     summary: Obtém um teste pelo ID
 *     tags: [Testes Aplicados]
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
 *         description: Detalhes do teste
 */
testesRouter.get("/:id", controller.show);

/**
 * @swagger
 * /testes-aplicados/{id}:
 *   patch:
 *     summary: Atualiza um teste aplicado
 *     tags: [Testes Aplicados]
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
 *               Nome:
 *                 type: string
 *               Descricao:
 *                 type: string
 *               Resultado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Teste atualizado
 */
testesRouter.patch("/:id", validate(UpdateTesteAplicadoSchema), controller.update);

/**
 * @swagger
 * /testes-aplicados/{id}:
 *   delete:
 *     summary: Remove um teste
 *     tags: [Testes Aplicados]
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
 *         description: Teste removido
 */
testesRouter.delete("/:id", controller.delete);

export default testesRouter;
