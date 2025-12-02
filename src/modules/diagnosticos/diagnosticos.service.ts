import { AppDataSource } from "../../shared/database/data-source";
import { Diagnostico } from "./diagnosticos.entity";
import { Consulta } from "../consultas/consultas.entity";
import { CreateDiagnosticoDto, UpdateDiagnosticoDto } from "./diagnosticos.schema";
import { AppError } from "../../shared/errors/AppError";

export class DiagnosticosService {
  private repo = AppDataSource.getRepository(Diagnostico);
  private consultaRepo = AppDataSource.getRepository(Consulta);

  async create(data: CreateDiagnosticoDto) {
    // 1. Validar se a Consulta existe
    const consulta = await this.consultaRepo.findOneBy({ ConsultaID: data.ConsultaID });
    
    if (!consulta) {
      throw new AppError("Consulta não encontrada.", 404);
    }

    // 2. Criar diagnóstico
    const diagnostico = this.repo.create(data);
    return await this.repo.save(diagnostico);
  }

  async findAll() {
    return await this.repo.find({
      relations: ["consulta"], // Traz os dados da consulta junto
    });
  }

  async findOne(id: number) {
    const diagnostico = await this.repo.findOne({
      where: { DiagnosticoID: id },
      relations: ["consulta"],
    });

    if (!diagnostico) {
      throw new AppError("Diagnóstico não encontrado", 404);
    }
    return diagnostico;
  }

  async update(id: number, data: UpdateDiagnosticoDto) {
    const diagnostico = await this.findOne(id);
    this.repo.merge(diagnostico, data);
    return await this.repo.save(diagnostico);
  }

  async delete(id: number) {
    const diagnostico = await this.findOne(id);
    return await this.repo.remove(diagnostico);
  }
}