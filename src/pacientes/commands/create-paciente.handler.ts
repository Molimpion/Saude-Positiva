// src/pacientes/commands/create-paciente.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente.entity';
import { CreatePacienteCommand } from './create-paciente.command';

@CommandHandler(CreatePacienteCommand)
export class CreatePacienteHandler
  implements ICommandHandler<CreatePacienteCommand>
{
  constructor(
    // Injeta o repositório da entidade Paciente (TypeORM)
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async execute(command: CreatePacienteCommand): Promise<Paciente> {
    const { data } = command;

    const novoPaciente = this.pacienteRepository.create({
      ...data,
    });

    // 3. Lógica de Negócio: Salvar a transação
    return this.pacienteRepository.save(novoPaciente);
  }
}
