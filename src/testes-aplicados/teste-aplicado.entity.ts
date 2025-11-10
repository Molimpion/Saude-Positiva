import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Prontuario } from '../prontuarios/prontuario.entity';

@Entity()
export class TesteAplicado {
  @PrimaryGeneratedColumn()
  TesteID: number;

  @Column()
  ProntuarioID: number;

  @Column()
  TipoTeste: string;

  @Column({ type: 'date' })
  DataAplicacao: Date;

  @Column({ type: 'text', nullable: true })
  Resultados: string;

  @Column({ type: 'text', nullable: true })
  LaudoInterpretativo: string;

  // --- Relacionamentos ---

  @ManyToOne(() => Prontuario, (prontuario) => prontuario.testesAplicados)
  @JoinColumn({ name: 'ProntuarioID' })
  prontuario: Prontuario;
}
