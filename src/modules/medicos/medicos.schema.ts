import { z } from "zod";

export const CreateMedicoSchema = z.object({
  body: z.object({
    NomeCompleto: z.string().min(3, "Nome obrigatório"),
    CRM: z.string().min(4, "CRM obrigatório"),
    Especialidade: z.string().min(3, "Especialidade obrigatória"),
    Telefone: z.string().optional(),
    Email: z.string().email("E-mail inválido").optional(),
  }),
});

export const UpdateMedicoSchema = z.object({
  body: z.object({
    NomeCompleto: z.string().min(3).optional(),
    CRM: z.string().min(4).optional(),
    Especialidade: z.string().min(3).optional(),
    Telefone: z.string().optional(),
    Email: z.string().email().optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID deve ser um número"),
  }),
});

export type CreateMedicoDto = z.infer<typeof CreateMedicoSchema>["body"];
export type UpdateMedicoDto = z.infer<typeof UpdateMedicoSchema>["body"];