import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Prontuario } from '../prontuarios/prontuario.entity';
import { Medico } from '../medicos/medico.entity';

@Entity()
export class Consulta {
  @PrimaryGeneratedColumn()
  ConsultaID: number;

  @Column()
  ProntuarioID: number;

  @Column()
  MedicoID: number;

  @Column({ type: 'timestamp' })
  DataHoraInicio: Date;

  @Column({ type: 'timestamp', nullable: true })
  DataHoraFim: Date;

  @Column({ default: 'Individual' })
  TipoConsulta: string;

  @Column({ type: 'text', nullable: true })
  ResumoConsulta: string;

  @Column({ type: 'text', nullable: true })
  Observacoes: string;

  @Column({ type: 'text', nullable: true })
  IntervencoesUtilizadas: string;

  @Column({ default: 'Realizada' })
  StatusConsulta: string;

  // --- Relacionamentos ---

  @ManyToOne(() => Prontuario, (prontuario) => prontuario.consultas)
  @JoinColumn({ name: 'ProntuarioID' })
  prontuario: Prontuario;

  @ManyToOne(() => Medico, (medico) => medico.consultas)
  @JoinColumn({ name: 'MedicoID' })
  medico: Medico;
}
