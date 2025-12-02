import { hash } from "bcrypt";
import { AppDataSource } from "../../shared/database/data-source";
import { User } from "./user.entity";
import { CreateUserDto, UpdateUserDto } from "./users.schema";
import { AppError } from "../../shared/errors/AppError";

export class UsersService {
  private repo = AppDataSource.getRepository(User);

  async create(data: CreateUserDto) {
    const userExists = await this.repo.findOneBy({ email: data.email });
    if (userExists) throw new AppError("E-mail já cadastrado.");

    const passwordHash = await hash(data.password, 8);
    const user = this.repo.create({ ...data, password_hash: passwordHash });
    await this.repo.save(user);

    const { password_hash, ...result } = user;
    return result;
  }

  async findAll() {
    return await this.repo.find({ select: ["id", "nome", "email"] });
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ 
        where: { id },
        select: ["id", "nome", "email"] 
    });
    if (!user) throw new AppError("Usuário não encontrado", 404);
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new AppError("Usuário não encontrado", 404);

    if (data.password) user.password_hash = await hash(data.password, 8);
    if (data.nome) user.nome = data.nome;
    if (data.email) user.email = data.email;

    await this.repo.save(user);
    const { password_hash, ...result } = user;
    return result;
  }

  async delete(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new AppError("Usuário não encontrado", 404);
    return await this.repo.remove(user);
  }
}