// src/pacientes/dto/update-paciente.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreatePacienteDto } from './create-paciente.dto';

// PartialType torna todos os campos de CreatePacienteDto opcionais
export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {}
