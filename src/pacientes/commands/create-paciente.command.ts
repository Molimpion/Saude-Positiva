// src/pacientes/commands/create-paciente.command.ts
import { CreatePacienteDto } from '../schemas/paciente.schema'; // <-- MUDANÇA DE CAMINHO (para Zod)
import { User } from '../../users/user.entity'; // <-- ADICIONE

export class CreatePacienteCommand {
  constructor(
    public readonly data: CreatePacienteDto,
    public readonly user?: User, // <-- ADICIONE e torne opcional
  ) {}
}
