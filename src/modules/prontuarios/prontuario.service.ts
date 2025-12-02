import { AppDataSource } from "../../shared/database/data-source";
import { Prontuario } from "./prontuario.entity";
import { Paciente } from "../pacientes/paciente.entity";
import { Medico } from "../medicos/medicos.entity";
import { CreateProntuarioDto, UpdateProntuarioDto } from "./prontuario.schema";
import { AppError } from "../../shared/errors/AppError";

export class ProntuarioService {
    private repo = AppDataSource.getRepository(Prontuario);
    private pacienteRepo = AppDataSource.getRepository(Paciente);
    private medicoRepo = AppDataSource.getRepository(Medico);

    async create(data: CreateProntuarioDto) {
        // 1. Validar Paciente
        const paciente = await this.pacienteRepo.findOneBy({ PacienteID: data.PacienteID });
        if (!paciente) {
            throw new AppError("Paciente não encontrado.", 404);
        }

        // 2. Validar Médico (se informado)
        if (data.MedicoResponsavelID) {
            const medico = await this.medicoRepo.findOneBy({ MedicoID: data.MedicoResponsavelID });
            if (!medico) {
                throw new AppError("Médico responsável não encontrado.", 404);
            }
        }

        const prontuario = this.repo.create(data);
        return await this.repo.save(prontuario);
    }

    async findAll() {
        return await this.repo.find({
            relations: ["paciente", "medicoResponsavel"]
        });
    }

    async findOne(id: number) {
        const prontuario = await this.repo.findOne({
            where: { ProntuarioID: id },
            relations: ["paciente", "medicoResponsavel", "consultas"]
        });

        if (!prontuario) {
            throw new AppError("Prontuário não encontrado", 404);
        }
        return prontuario;
    }

    async update(id: number, data: UpdateProntuarioDto) {
        const prontuario = await this.findOne(id);
        this.repo.merge(prontuario, data);
        return await this.repo.save(prontuario);
    }
    
    async delete(id: number) {
        const prontuario = await this.findOne(id);
        return await this.repo.remove(prontuario);
    }
}