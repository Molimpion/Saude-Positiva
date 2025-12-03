import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { Medico } from '../medicos/medicos.entity';
import { Consulta } from '../consultas/consultas.entity';

@Entity('prontuarios')
export class Prontuario {
  @PrimaryGeneratedColumn()
  ProntuarioID: number;

  @Column()
  PacienteID: number;

  @Column({ nullable: true })
  MedicoResponsavelID: number;

  @Column({ type: 'text' })
  QueixaPrincipal: string;

  @Column({ type: 'text', nullable: true })
  HistoricoMedico: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  DataAbertura: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.prontuarios)
  @JoinColumn({ name: 'PacienteID' })
  paciente: Paciente;

  @ManyToOne(() => Medico)
  @JoinColumn({ name: 'MedicoResponsavelID' })
  medicoResponsavel: Medico;

  @OneToMany(() => Consulta, (consulta) => consulta.prontuario)
  consultas: Consulta[];
}