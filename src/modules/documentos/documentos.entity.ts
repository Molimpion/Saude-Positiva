// documentos.entity.ts
export interface Documento {
  id: string;
  titulo: string;
  tipo: string;
  caminhoArquivo: string; // URL ou path
  criadoEm: Date;
  atualizadoEm: Date;
}

