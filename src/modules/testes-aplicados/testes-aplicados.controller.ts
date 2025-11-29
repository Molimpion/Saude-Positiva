// testes-aplicados.controller.ts
import { Request, Response } from "express";
import { TestesAplicadosService } from "./testes-aplicados.service";

export class TestesAplicadosController {
  private service = new TestesAplicadosService();

  create = async (req: Request, res: Response) => {
    const { nome, descricao, resultado } = req.body;

    const result = await this.service.create({ nome, descricao, resultado });
    return res.status(201).json(result);
  };

  index = async (_req: Request, res: Response) => {
    const result = await this.service.findAll();
    return res.json(result);
  };

  show = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.service.findById(id);
    if (!result) {
      return res.status(404).json({ message: "Teste aplicado não encontrado" });
    }

    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this.service.update(id, req.body);
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.service.delete(id);
    return res.status(204).send();
  };
}

