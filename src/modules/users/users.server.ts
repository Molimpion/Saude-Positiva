import { hash } from "bcrypt";
import { AppDataSource } from "../../shared/database/data-source";
import { AppError } from "../../shared/errors/AppError";
import { User } from "./user.entity";

export class UsersService {
  private repo = AppDataSource.getRepository(User);

  async create(data: any) {
    // 1. Verificar se o usuário já existe (Seu trecho)
    const userExists = await this.repo.findOneBy({ email: data.email });

    if (userExists) {
      throw new AppError("Já existe um usuário com este e-mail.");
    }

    // 2. Criptografar a senha antes de salvar
    const passwordHash = await hash(data.password, 8);

    // 3. Criar e salvar o usuário
    const user = this.repo.create({
      email: data.email,
      password_hash: passwordHash,
      // Se tiver outros campos no DTO, adicione aqui ou use ...data (com cuidado)
    });

    await this.repo.save(user);

    return user;
  }

  async findAll() {
    return await this.repo.find();
  }
}