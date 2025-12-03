import { z } from 'zod';

// Definimos os campos base para reutilizar
const PacienteBody = z.object({
  Email: z.string().email('E-mail inválido.'),
  NomeCompleto: z.string().min(1, 'Nome não pode ser vazio'),
  CPF: z.string().length(11, 'O CPF deve ter 11 dígitos.'),
  Telefone: z.string().min(1, 'Telefone não pode ser vazio'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres.'),
  // Aceita string e converte para Date
  DataNascimento: z.string().pipe(z.coerce.date()).optional(),
  Endereco: z.string().optional(),
  EstadoCivil: z.enum(['Solteiro', 'Casado', 'Divorciado', 'Viúvo']).optional(),
  NomeContatoEmergencia: z.string().optional(),
  TelefoneContatoEmergencia: z.string().optional(),
});

export const CreatePacienteSchema = z.object({
  body: PacienteBody,
});

export const UpdatePacienteSchema = z.object({
  body: PacienteBody.omit({
    password: true,
  }).partial(),
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID inválido'),
  }),
});

export type CreatePacienteDto = z.infer<typeof CreatePacienteSchema>['body'];
export type UpdatePacienteDto = z.infer<typeof UpdatePacienteSchema>['body'];