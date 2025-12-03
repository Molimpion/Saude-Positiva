import { AppDataSource } from "../../shared/database/data-source";
import { Documento } from "./documentos.entity";
import { AppError } from "../../shared/errors/AppError";

export class DocumentosService {
  private repo = AppDataSource.getRepository(Documento);

  async create(data: Partial<Documento>) {
    const documento = this.repo.create(data);
    return await this.repo.save(documento);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: string) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: string, data: Partial<Documento>) {
    const documento = await this.findById(id);
    
    if (!documento) {
      throw new AppError("Documento não encontrado", 404);
    }

    this.repo.merge(documento, data);
    return await this.repo.save(documento);
  }

  async delete(id: string) {
    const documento = await this.findById(id);
    
    if (!documento) {
      throw new AppError("Documento não encontrado", 404);
    }

    return await this.repo.remove(documento);
  }
}