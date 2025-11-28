import { AppDataSource } from "../../shared/database/data-source";
import { Medico } from "./medicos.entity";
import { CreateMedicoDto, UpdateMedicoDto } from "./medicos.schema";

export class MedicoService {
    private repo = AppDataSource.getRepository(Medico);

    async create(data: CreateMedicoDto) {
        const medico = this.repo.create(data);
        return await this.repo.save(medico);
    }

    async findOne(id: number) {
        const medico = await this.repo.findOne({ 
            where: { MedicoID: id },
        });

        if (!medico) {
            throw new Error("Médico não encontrado");
        }

        return medico;
    }

    async update(id: number, data: UpdateMedicoDto) {
        const medico = await this.findOne(id);
        this.repo.merge(medico, data);
        return await this.repo.save(medico);
    }

    async findAll() {
        return await this.repo.find();
    }
}
