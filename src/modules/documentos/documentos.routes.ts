import { Router } from "express";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";
import { validate } from "../../shared/http/middlewares/validate.middleware";

import { DocumentosController } from "./documentos.controller";
import {
  CreateDocumentoSchema,
  UpdateDocumentoSchema,
  ShowOrDeleteDocumentoSchema,
} from "./documentos.schema";

const router = Router();
const controller = new DocumentosController();

router.use(ensureAuthenticated);

/**
 * @swagger
 * tags:
 *   - name: Documentos
 *     description: Gestão de documentos
 */

/**
 * @swagger
 * /documentos:
 *   post:
 *     summary: Cria um novo documento
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, tipo, caminhoArquivo]
 *             properties:
 *               titulo:
 *                 type: string
 *               tipo:
 *                 type: string
 *               caminhoArquivo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Documento criado
 */
router.post("/", validate(CreateDocumentoSchema), controller.create);

/**
 * @swagger
 * /documentos:
 *   get:
 *     summary: Lista todos os documentos
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de documentos
 */
router.get("/", controller.index);

/**
 * @swagger
 * /documentos/{id}:
 *   get:
 *     summary: Obtém um documento pelo ID (UUID)
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Detalhes do documento
 */
router.get("/:id", validate(ShowOrDeleteDocumentoSchema), controller.show);

/**
 * @swagger
 * /documentos/{id}:
 *   patch:
 *     summary: Atualiza um documento
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               tipo:
 *                 type: string
 *               caminhoArquivo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Documento atualizado
 */
router.patch("/:id", validate(UpdateDocumentoSchema), controller.update);

/**
 * @swagger
 * /documentos/{id}:
 *   delete:
 *     summary: Remove um documento
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Documento removido
 */
router.delete("/:id", validate(ShowOrDeleteDocumentoSchema), controller.delete);

export default router;
