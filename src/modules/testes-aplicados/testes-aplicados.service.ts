import { AppDataSource } from "../../shared/database/data-source";
import { TesteAplicado } from "./testes-aplicados.entity";
import { CreateTesteAplicadoDto, UpdateTesteAplicadoDto } from "./testes-aplicados.schema";
import { AppError } from "../../shared/errors/AppError";

export class TestesAplicadosService {
  private repo = AppDataSource.getRepository(TesteAplicado);

  async create(data: CreateTesteAplicadoDto) {
    const teste = this.repo.create(data);
    return await this.repo.save(teste);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const teste = await this.repo.findOneBy({ TesteID: id });
    if (!teste) throw new AppError("Teste aplicado não encontrado", 404);
    return teste;
  }

  async update(id: number, data: UpdateTesteAplicadoDto) {
    const teste = await this.findOne(id);
    this.repo.merge(teste, data);
    return await this.repo.save(teste);
  }

  async delete(id: number) {
    const teste = await this.findOne(id);
    return await this.repo.remove(teste);
  }
}