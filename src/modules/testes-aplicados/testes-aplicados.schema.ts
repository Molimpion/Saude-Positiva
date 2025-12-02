import { z } from "zod";

export const CreateTesteAplicadoSchema = z.object({
  body: z.object({
    Nome: z.string().min(3, "Nome do teste é obrigatório"),
    Descricao: z.string().optional(),
    Resultado: z.string().min(1, "Resultado é obrigatório"),
    ConsultaID: z.number().optional(),
  }),
});

export const UpdateTesteAplicadoSchema = z.object({
  body: z.object({
    Nome: z.string().min(3).optional(),
    Descricao: z.string().optional(),
    Resultado: z.string().min(1).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID deve ser um número"),
  }),
});

export type CreateTesteAplicadoDto = z.infer<typeof CreateTesteAplicadoSchema>["body"];
export type UpdateTesteAplicadoDto = z.infer<typeof UpdateTesteAplicadoSchema>["body"];