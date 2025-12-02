import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../shared/database/data-source";
import { AppError } from "../../shared/errors/AppError"; // Certifique-se de ter criado este arquivo
import { User } from "../users/user.entity";
import { LoginDto, RegisterDto } from "./auth.schema";

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  async login({ email, password }: LoginDto) {
    // 1. Buscar usuário pelo e-mail
    const user = await this.userRepo.findOneBy({ email });

    if (!user) {
      throw new AppError("E-mail ou senha incorretos.", 401);
    }

    // 2. Comparar a senha enviada com o hash no banco
    const passwordMatched = await compare(password, user.password_hash);

    if (!passwordMatched) {
      throw new AppError("E-mail ou senha incorretos.", 401);
    }

    // 3. Gerar o Token JWT
    const token = sign(
      {}, // Payload (se quiser adicionar roles, coloque aqui)
      process.env.JWT_SECRET || "default_secret", // IMPORTANTE: Configure isso no .env
      {
        subject: String(user.id), // O ID do usuário vira o "sub" do token
        expiresIn: "1d", // Expira em 1 dia
      }
    );

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    };
  }

  async register(data: RegisterDto) {
    const userExists = await this.userRepo.findOneBy({ email: data.email });

    if (userExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const passwordHash = await hash(data.password, 8);

    const user = this.userRepo.create({
      email: data.email,
      password_hash: passwordHash,
    });

    await this.userRepo.save(user);

    return {
      id: user.id,
      email: user.email,
    };
  }
}