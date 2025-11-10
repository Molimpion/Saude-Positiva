// src/pacientes/commands/update-paciente.command.ts
import { UpdatePacienteDto } from '../dto/update-paciente.dto';

// O Command precisa do ID e dos dados a serem atualizados
export class UpdatePacienteCommand {
  constructor(
    public readonly id: number,
    public readonly data: UpdatePacienteDto,
  ) {}
}
