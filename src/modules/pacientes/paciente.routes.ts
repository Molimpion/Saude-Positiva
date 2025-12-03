import { Router } from "express";
import { PacienteController } from "./paciente.controller";
import { validate } from "../../shared/http/middlewares/validate.middleware";
import { CreatePacienteSchema, UpdatePacienteSchema } from "./paciente.schema";
import { ensureAuthenticated } from "../../shared/http/middlewares/auth.middleware";

const pacienteRouter = Router();
const controller = new PacienteController();


/**
 * @swagger
 * tags:
 *   - name: Pacientes
 *     description: Gestão de pacientes
 */

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [NomeCompleto, Email, CPF, Telefone, password]
 *             properties:
 *               NomeCompleto:
 *                 type: string
 *               Email:
 *                 type: string
 *               CPF:
 *                 type: string
 *               Telefone:
 *                 type: string
 *               password:
 *                 type: string
 *               DataNascimento:
 *                 type: string
 *                 format: date
 *               Endereco:
 *                 type: string
 *               EstadoCivil:
 *                 type: string
 *                 enum: [Solteiro, Casado, Divorciado, Viúvo]
 *               NomeContatoEmergencia:
 *                 type: string
 *               TelefoneContatoEmergencia:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente criado
 *       400:
 *         description: Erro de validação
 */
pacienteRouter.post("/", validate(CreatePacienteSchema), controller.create);

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Lista todos os pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 */
pacienteRouter.get("/", controller.index);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Obtém um paciente pelo ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do paciente
 *       404:
 *         description: Paciente não encontrado
 */
pacienteRouter.get("/:id", controller.show);

/**
 * @swagger
 * /pacientes/{id}:
 *   patch:
 *     summary: Atualiza dados de um paciente
 *     tags: [Pacientes]
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
 *               Telefone:
 *                 type: string
 *               Endereco:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente atualizado
 */
pacienteRouter.patch("/:id", validate(UpdatePacienteSchema), controller.update);

/**
 * @swagger
 * /pacientes/{id}/historico:
 *   get:
 *     summary: Retorna o histórico completo (consultas e testes) do paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Histórico detalhado
 *       404:
 *         description: Paciente não encontrado
 */
pacienteRouter.get("/:id/historico", controller.getHistory);

export default pacienteRouter;
