// src/pacientes/commands/create-paciente.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente.entity';
import { CreatePacienteCommand } from './create-paciente.command';
import { CreatePacienteDto } from '../schemas/paciente.schema'; // 1. Importando do Schema Zod

@CommandHandler(CreatePacienteCommand)
export class CreatePacienteHandler
  implements ICommandHandler<CreatePacienteCommand>
{
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async execute(command: CreatePacienteCommand): Promise<Paciente> {
    const { data, user } = command; // 2. Extrai 'data' (DTO) e 'user' (opcional)

    // 3. Cria a nova entidade Paciente
    const novoPaciente = this.pacienteRepository.create({
      ...data, // Espalha os dados do DTO (NomeCompleto, CPF, etc.)
      user: user, // 4. Associa a entidade User (se ela foi passada)
    });

    // 5. Salva a transação
    return this.pacienteRepository.save(novoPaciente);
  }
}
