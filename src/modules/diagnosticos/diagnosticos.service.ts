// diagnosticos.service.ts
import { prisma } from "../../shared/prisma";
import { Diagnostico } from "./diagnosticos.entity";

export class DiagnosticosService {
  async create(data: Omit<Diagnostico, "id" | "criadoEm" | "atualizadoEm">) {
    return prisma.diagnostico.create({ data });
  }

  async findAll() {
    return prisma.diagnostico.findMany();
  }

  async findById(id: string) {
    const diagnostico = await prisma.diagnostico.findUnique({ where: { id } });
    return diagnostico;
  }

  async update(id: string, data: Partial<Diagnostico>) {
    return prisma.diagnostico.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.diagnostico.delete({ where: { id } });
  }
}

