import { z } from "zod";

export const CreateConsultaSchema = z.object({
  body: z.object({
    PacienteID: z.number(),
    MedicoID: z.number(),
        Data: z.coerce.date(),
        Hora: z.string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Hora deve ser no formato HH:MM"),
    Motivo: z.string().optional(),
    ProntuarioID: z.number().optional(),
  }),
});

export const UpdateConsultaSchema = z.object({
  body: z.object({
    Data: z.coerce.date().optional(),
    Hora: z.string()
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Hora inválida")
      .optional(),
    Motivo: z.string().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID deve ser um número"),
  }),
});

export type CreateConsultaDto = z.infer<typeof CreateConsultaSchema>["body"];
export type UpdateConsultaDto = z.infer<typeof UpdateConsultaSchema>["body"];