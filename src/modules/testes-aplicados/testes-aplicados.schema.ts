// testes-aplicados.schema.ts
import { z } from "zod";

export const CreateTesteAplicadoSchema = z.object({
  body: z.object({
    nome: z.string().min(3, "Nome obrigatório"),
    descricao: z.string().min(5, "Descrição obrigatória"),
    resultado: z.string().min(2, "Resultado obrigatório"),
  }),
});

export const UpdateTesteAplicadoSchema = z.object({
  body: z.object({
    nome: z.string().min(3).optional(),
    descricao: z.string().min(5).optional(),
    resultado: z.string().min(2).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const ShowOrDeleteTesteAplicadoSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

