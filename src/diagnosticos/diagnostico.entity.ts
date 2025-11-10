import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Prontuario } from '../prontuarios/prontuario.entity';

@Entity()
export class Diagnostico {
  @PrimaryGeneratedColumn()
  DiagnosticoID: number;

  @Column()
  ProntuarioID: number;

  @Column({ type: 'date' })
  DataDiagnostico: Date;

  @Column({ nullable: true })
  CodigoCID: string;

  @Column({ type: 'text', nullable: true })
  Descricao: string;

  @Column({ type: 'text', nullable: true })
  Observacoes: string;

  // --- Relacionamentos ---

  @ManyToOne(() => Prontuario, (prontuario) => prontuario.diagnosticos)
  @JoinColumn({ name: 'ProntuarioID' })
  prontuario: Prontuario;
}
