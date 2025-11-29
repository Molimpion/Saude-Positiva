// testes-aplicados.service.ts
import { prisma } from "../../shared/prisma";
import { TesteAplicado } from "./testes-aplicados.entity";

export class TestesAplicadosService {
  async create(data: Omit<TesteAplicado, "id" | "criadoEm" | "atualizadoEm">) {
    return prisma.testesAplicados.create({ data });
  }

  async findAll() {
    return prisma.testesAplicados.findMany();
  }

  async findById(id: string) {
    return prisma.testesAplicados.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<TesteAplicado>) {
    return prisma.testesAplicados.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.testesAplicados.delete({ where: { id } });
  }
}

