// src/auth/schemas/auth.schema.ts
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// O Swagger (ApiBody) não funcionará mais com o tipo,
// mas a validação Zod é mais importante.
export type LoginDto = z.infer<typeof LoginSchema>;
