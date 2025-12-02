import { Request, Response } from "express";
import { MedicoService } from "./medicos.service";

export class MedicoController {
  private service = new MedicoService();

  create = async (req: Request, res: Response) => {
    const result = await this.service.create(req.body);
    return res.status(201).json(result);
  };

  index = async (req: Request, res: Response) => {
    const result = await this.service.findAll();
    return res.json(result);
  };

  show = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.findOne(Number(id));
    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.update(Number(id), req.body);
    return res.json(result);
  };
}