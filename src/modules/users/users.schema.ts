import { z } from "zod";

export const CreateUserSchema = z.object({
  body: z.object({
    nome: z.string().min(3, "Nome obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  }),
});

export const UpdateUserSchema = z.object({
  body: z.object({
    nome: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(), // Senha é opcional na edição
  }),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID inválido"),
  }),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>["body"];
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>["body"];