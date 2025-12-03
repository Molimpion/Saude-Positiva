import { Request, Response } from "express";
import { PacienteService } from "./paciente.service";

const service = new PacienteService();

export class PacienteController {
    
    async create(req: Request, res: Response) {
        try {
            const result = await service.create(req.body);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const result = await service.findOne(Number(id));
        return res.json(result);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const result = await service.update(Number(id), req.body);
        return res.json(result);
    }

    async index(req: Request, res: Response) {
        const result = await service.findAll();
        return res.json(result);
    }

    async getHistory(req: Request, res: Response) {
        const { id } = req.params;
        const result = await service.findHistory(Number(id));
        return res.json(result);
    }
}