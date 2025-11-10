// src/pacientes/commands/create-paciente.command.ts
import { CreatePacienteDto } from '../dto/create-paciente.dto';

// O Command recebe todos os dados do DTO
export class CreatePacienteCommand {
  // O 'constructor' força a atribuição de todos os campos
  constructor(public readonly data: CreatePacienteDto) {}
}
