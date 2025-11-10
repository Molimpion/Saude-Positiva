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

    // 1. Lógica de Negócio: Transformação de Dados
    // O DTO usa string para data, mas a entidade usa Date.
    const dataNascimentoDate = new Date(data.DataNascimento);

    // 2. Lógica de Negócio: Criação e Validação de Entidade (implícita no TypeORM)
    const novoPaciente = this.pacienteRepository.create({
      ...data, // Copia todos os campos
      DataNascimento: dataNascimentoDate, // Sobrescreve com o tipo Date
    });

    // 3. Lógica de Negócio: Salvar a transação
    return this.pacienteRepository.save(novoPaciente);
  }
}
