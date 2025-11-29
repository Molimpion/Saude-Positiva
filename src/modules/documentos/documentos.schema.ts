// documentos.schema.ts
import { z } from "zod";

export const CreateDocumentoSchema = z.object({
  body: z.object({
    titulo: z.string().min(3, "Título obrigatório"),
    tipo: z.string().min(2, "Tipo obrigatório"),
    caminhoArquivo: z.string().url("Informe uma URL válida"),
  }),
});

export const UpdateDocumentoSchema = z.object({
  body: z.object({
    titulo: z.string().min(3).optional(),
    tipo: z.string().min(2).optional(),
    caminhoArquivo: z.string().url().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const ShowOrDeleteDocumentoSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

