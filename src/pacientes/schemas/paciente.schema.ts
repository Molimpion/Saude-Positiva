// src/pacientes/schemas/paciente.schema.ts
import { z } from 'zod';

// Schema base com todos os campos do signup
export const CreatePacienteSchema = z.object({
  Email: z.string().email('E-mail inválido.'),
  NomeCompleto: z.string().min(1, 'Nome não pode ser vazio'),
  CPF: z.string().length(11, 'O CPF deve ter 11 dígitos.'),
  Telefone: z.string().min(1, 'Telefone não pode ser vazio'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),

  // Campos do DTO original que não estão no signup, mas podem ser usados
  DataNascimento: z.string().pipe(z.coerce.date()).optional(),
  Endereco: z.string().optional(),
  EstadoCivil: z.enum(['Solteiro', 'Casado', 'Divorciado', 'Viúvo']).optional(),
  NomeContatoEmergencia: z.string().optional(),
  TelefoneContatoEmergencia: z.string().optional(),
});

// O Schema de Atualização é parcial e omite a senha
export const UpdatePacienteSchema = CreatePacienteSchema.omit({
  password: true,
}).partial();

// Tipos inferidos
export type CreatePacienteDto = z.infer<typeof CreatePacienteSchema>;
export type UpdatePacienteDto = z.infer<typeof UpdatePacienteSchema>;
