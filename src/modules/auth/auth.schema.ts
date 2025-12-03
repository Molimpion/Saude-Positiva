import { z } from "zod";

export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  }),
});

export const RegisterSchema = z.object({
  body: z.object({
    nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  }),
});

export type LoginDto = z.infer<typeof LoginSchema>["body"];
export type RegisterDto = z.infer<typeof RegisterSchema>["body"];