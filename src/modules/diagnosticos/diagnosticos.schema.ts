// diagnosticos.schema.ts
import { z } from "zod";

export const CreateDiagnosticoSchema = z.object({
  body: z.object({
    titulo: z.string().min(3, "Título obrigatório"),
    descricao: z.string().min(5, "Descrição obrigatória"),
  }),
});

export const UpdateDiagnosticoSchema = z.object({
  body: z.object({
    titulo: z.string().min(3).optional(),
    descricao: z.string().min(5).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const ShowOrDeleteDiagnosticoSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

