// src/pacientes/commands/update-paciente.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from '../paciente.entity';
import { UpdatePacienteCommand } from './update-paciente.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdatePacienteCommand)
export class UpdatePacienteHandler
  implements ICommandHandler<UpdatePacienteCommand, Paciente>
{
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}

  async execute(command: UpdatePacienteCommand): Promise<Paciente> {
    const { id, data } = command;

    // 1. Lógica de Negócio: Buscar o Paciente (para garantir que existe)
    const paciente = await this.pacienteRepository.findOne({
      where: { PacienteID: id },
    });

    if (!paciente) {
      // Se não existe, não podemos atualizar.
      throw new NotFoundException(
        `Paciente com ID ${id} não encontrado para atualização.`,
      );
    }

    // 2. Lógica de Negócio: Atualização da Data de Nascimento (se presente)
    const dataAtualizada = data;

    // 3. Lógica de Banco: O .merge combina a entidade existente com os novos dados
    this.pacienteRepository.merge(paciente, dataAtualizada);

    // 4. Salva a transação e retorna a entidade atualizada
    return this.pacienteRepository.save(paciente);
  }
}
