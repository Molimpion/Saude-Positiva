import { z } from "zod";

export const CreateDiagnosticoSchema = z.object({
  body: z.object({
    // Sem { required_error } para evitar conflito de versão
    ConsultaID: z.number(),
    Titulo: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
    Descricao: z.string().min(5, "Descrição deve ter no mínimo 5 caracteres"),
  }),
});

export const UpdateDiagnosticoSchema = z.object({
  body: z.object({
    Titulo: z.string().min(3).optional(),
    Descricao: z.string().min(5).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID deve ser um número"),
  }),
});

// Tipos inferidos
export type CreateDiagnosticoDto = z.infer<typeof CreateDiagnosticoSchema>["body"];
export type UpdateDiagnosticoDto = z.infer<typeof UpdateDiagnosticoSchema>["body"];