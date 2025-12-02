import { z } from 'zod';

export const CreateProntuarioSchema = z.object({
  body: z.object({
    PacienteID: z.number(),
    MedicoResponsavelID: z.number().optional(),
    QueixaPrincipal: z.string().min(3, "Queixa principal é obrigatória"),
    HistoricoMedico: z.string().optional(),
  }),
});

export const UpdateProntuarioSchema = z.object({
  body: z.object({
    MedicoResponsavelID: z.number().optional(),
    QueixaPrincipal: z.string().min(3).optional(),
    HistoricoMedico: z.string().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID deve ser um número"),
  }),
});

export type CreateProntuarioDto = z.infer<typeof CreateProntuarioSchema>['body'];
export type UpdateProntuarioDto = z.infer<typeof UpdateProntuarioSchema>['body'];