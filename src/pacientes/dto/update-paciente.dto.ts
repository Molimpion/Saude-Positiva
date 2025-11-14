import { OmitType, PartialType } from '@nestjs/swagger';
import { CreatePacienteDto } from './create-paciente.dto';

// PartialType torna todos os campos de CreatePacienteDto opcionais
// OmitType remove campos específicos
export class UpdatePacienteDto extends PartialType(
  OmitType(CreatePacienteDto, ['password'] as const),
) {}
