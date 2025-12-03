import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("documentos")
export class Documento {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  titulo: string;

  @Column()
  tipo: string;

  @Column()
  caminhoArquivo: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}