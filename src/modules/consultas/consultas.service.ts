import { AppDataSource } from "../../shared/database/data-source";
import { Consulta } from "./consultas.entity";
import { CreateConsultaDto, UpdateConsultaDto } from "./consultas.schema";

export class ConsultaService {
    private repo = AppDataSource.getRepository(Consulta);

    async create(data: CreateConsultaDto) {
        const consulta = this.repo.create(data);
        return await this.repo.save(consulta);
    }

    async findOne(id: number) {
        const consulta = await this.repo.findOne({
            where: { ConsultaID: id },
            relations: ["paciente", "medico"] // se houver relações
        });

        if (!consulta) {
            throw new Error("Consulta não encontrada");
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
            relations: ["paciente", "medico"] // se quiser carregar juntos
        });
    }
}
