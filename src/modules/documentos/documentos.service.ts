// documentos.service.ts
import { prisma } from "../../shared/prisma";
import { Documento } from "./documentos.entity";

export class DocumentosService {
  async create(data: Omit<Documento, "id" | "criadoEm" | "atualizadoEm">) {
    return prisma.documento.create({ data });
  }

  async findAll() {
    return prisma.documento.findMany();
  }

  async findById(id: string) {
    return prisma.documento.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Documento>) {
    return prisma.documento.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.documento.delete({ where: { id } });
  }
}

