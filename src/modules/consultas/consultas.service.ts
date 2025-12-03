import { AppDataSource } from "../../shared/database/data-source";
import { Consulta } from "./consultas.entity";
import { Medico } from "../medicos/medicos.entity";
import { Paciente } from "../pacientes/paciente.entity";
import { CreateConsultaDto, UpdateConsultaDto } from "./consultas.schema";
import { AppError } from "../../shared/errors/AppError";

export class ConsultaService {
    private repo = AppDataSource.getRepository(Consulta);
    private medicoRepo = AppDataSource.getRepository(Medico);
    private pacienteRepo = AppDataSource.getRepository(Paciente);

    async create(data: CreateConsultaDto) {
        const medico = await this.medicoRepo.findOneBy({ MedicoID: data.MedicoID });
        if (!medico) {
            throw new AppError("Médico não encontrado.", 404);
        }

        const paciente = await this.pacienteRepo.findOneBy({ PacienteID: data.PacienteID });
        if (!paciente) {
            throw new AppError("Paciente não encontrado.", 404);
        }

        const consulta = this.repo.create(data);
        return await this.repo.save(consulta);
    }

    async findOne(id: number) {
        const consulta = await this.repo.findOne({
            where: { ConsultaID: id },
            relations: ["paciente", "medico", "prontuario"] 
        });

        if (!consulta) {
            throw new AppError("Consulta não encontrada", 404);
        }

        return consulta;
    }

    async update(id: number, data: UpdateConsultaDto) {
        const consulta = await this.findOne(id);
        this.repo.merge(consulta, data);
        return await this.repo.save(consulta);
    }

    async findAll() {
        return await this.repo.find({
            relations: ["paciente", "medico"]
        });
    }
    
    async delete(id: number) {
        const consulta = await this.findOne(id);
        return await this.repo.remove(consulta);
    }
}