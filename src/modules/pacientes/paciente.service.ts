import { In } from "typeorm";
import { AppDataSource } from "../../shared/database/data-source";
import { Paciente } from "./paciente.entity";
import { CreatePacienteDto, UpdatePacienteDto } from "./paciente.schema";
import { User } from "../users/user.entity";
import { Consulta } from "../consultas/consultas.entity";
import { TesteAplicado } from "../testes-aplicados/testes-aplicados.entity";

export class PacienteService {
    private repo = AppDataSource.getRepository(Paciente);
    private userRepo = AppDataSource.getRepository(User);
    private consultaRepo = AppDataSource.getRepository(Consulta);
    private testeRepo = AppDataSource.getRepository(TesteAplicado);

    async create(data: CreatePacienteDto) {
        const paciente = this.repo.create(data);
        return await this.repo.save(paciente);
    }

    async findOne(id: number) {
        const paciente = await this.repo.findOne({ 
            where: { PacienteID: id },
            relations: ["user"]
        });

        if (!paciente) {
            throw new Error("Paciente não encontrado");
        }
        return paciente;
    }

    async update(id: number, data: UpdatePacienteDto) {
        const paciente = await this.findOne(id);
        this.repo.merge(paciente, data);
        return await this.repo.save(paciente);
    }
    
    async findAll() {
        return await this.repo.find();
    }

    async findHistory(pacienteId: number) {
        await this.findOne(pacienteId);

        const consultas = await this.consultaRepo.find({
            where: { PacienteID: pacienteId },
            relations: ["medico"],
            order: { Data: "DESC" }
        });

        if (consultas.length === 0) {
            return [];
        }

        const consultaIds = consultas.map(c => c.ConsultaID);
        
        const testes = await this.testeRepo.findBy({
            ConsultaID: In(consultaIds)
        });

        const historico = consultas.map(consulta => {
            const testesDaConsulta = testes.filter(t => t.ConsultaID === consulta.ConsultaID);
            return {
                ...consulta,
                testes_aplicados: testesDaConsulta
            };
        });

        return historico;
    }
}