import { hash } from "bcrypt";
import { AppDataSource } from "../../shared/database/data-source";
import { AppError } from "../../shared/errors/AppError";
import { User } from "./user.entity";

export class UsersService {
  private repo = AppDataSource.getRepository(User);

  async create(data: any) {
    const userExists = await this.repo.findOneBy({ email: data.email });

    if (userExists) {
      throw new AppError("Já existe um usuário com este e-mail.");
    }

    const passwordHash = await hash(data.password, 8);

    const user = this.repo.create({
      email: data.email,
      password_hash: passwordHash,
    });

    await this.repo.save(user);

    return user;
  }

  async findAll() {
    return await this.repo.find();
  }
}