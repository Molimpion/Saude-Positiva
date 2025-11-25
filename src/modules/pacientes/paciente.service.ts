import { AppDataSource } from "../../shared/database/data-source";
import { Paciente } from "./paciente.entity";
import { CreatePacienteDto, UpdatePacienteDto } from "./paciente.schema";
import { User } from "../users/user.entity";

export class PacienteService {
    private repo = AppDataSource.getRepository(Paciente);
    private userRepo = AppDataSource.getRepository(User);

    async create(data: CreatePacienteDto) {
        // Exemplo: Criação simples. Na prática, o módulo Auth pode gerenciar a transação de User + Paciente.
        // Aqui assumimos que estamos criando apenas o registro do Paciente
        const paciente = this.repo.create(data);
        return await this.repo.save(paciente);
    }

    async findOne(id: number) {
        const paciente = await this.repo.findOne({ 
            where: { PacienteID: id },
            relations: ["user"] // Traz o usuário vinculado, se quiser
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
}