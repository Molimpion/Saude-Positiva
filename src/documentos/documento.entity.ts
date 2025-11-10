import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Prontuario } from '../prontuarios/prontuario.entity';

@Entity()
export class Documento {
  @PrimaryGeneratedColumn()
  DocumentoID: number;

  @Column()
  ProntuarioID: number;

  @Column()
  TipoDocumento: string;

  @Column({ nullable: true })
  Descricao: string;

  @Column({ type: 'date' })
  DataEmissao: Date;

  @Column() // Caminho para o S3, Google Storage, etc.
  CaminhoArquivo: string;

  // --- Relacionamentos ---

  @ManyToOne(() => Prontuario, (prontuario) => prontuario.documentos)
  @JoinColumn({ name: 'ProntuarioID' })
  prontuario: Prontuario;
}
