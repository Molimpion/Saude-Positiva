import { z } from "zod";

export const CreateConsultaSchema = z.object({
  body: z.object({
    // Removido o objeto { required_error } para compatibilidade
    PacienteID: z.number(),
    MedicoID: z.number(),
    
    // z.coerce.date() não aceita argumentos na v3, por isso o erro
    Data: z.coerce.date(),
    
    // O regex continua igual
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

// Tipos inferidos
export type CreateConsultaDto = z.infer<typeof CreateConsultaSchema>["body"];
export type UpdateConsultaDto = z.infer<typeof UpdateConsultaSchema>["body"];