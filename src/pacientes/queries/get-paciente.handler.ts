// src/pacientes/queries/get-paciente.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente.entity';
import { GetPacienteQuery } from './get-paciente.query';

// Anota que esta classe lida com a GetPacienteQuery
@QueryHandler(GetPacienteQuery)
export class GetPacienteHandler implements IQueryHandler<GetPacienteQuery> {
  constructor(
    // Injeta o repositório do Paciente
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async execute(query: GetPacienteQuery): Promise<Paciente | null> {
    // 1. Lógica de Busca: usa o ID da Query
    return this.pacienteRepository.findOne({
      where: { PacienteID: query.id },
      // 2. Lógica de Negócio (futura): incluir relacionamentos relevantes
      // Por enquanto, apenas busca o paciente principal
    });
  }
}
