import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../shared/database/data-source";
import { AppError } from "../../shared/errors/AppError";
import { User } from "../users/user.entity";
import { LoginDto, RegisterDto } from "./auth.schema";

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  async login({ email, password }: LoginDto) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new AppError("E-mail ou senha incorretos.", 401);

    const passwordMatched = await compare(password, user.password_hash);
    if (!passwordMatched) throw new AppError("E-mail ou senha incorretos.", 401);

    const token = sign({}, process.env.JWT_SECRET || "default_secret", {
      subject: String(user.id),
      expiresIn: "1d",
    });

    return { user: { id: user.id, email: user.email, nome: user.nome }, token };
  }

  async register(data: RegisterDto) {
    const userExists = await this.userRepo.findOneBy({ email: data.email });

    if (userExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const passwordHash = await hash(data.password, 8);

    const user = this.userRepo.create({
      nome: data.nome,
      email: data.email,
      password_hash: passwordHash,
    });

    await this.userRepo.save(user);

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  }
}