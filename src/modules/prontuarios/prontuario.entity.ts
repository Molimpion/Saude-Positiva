import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  DataAbertura: Date;

  @ManyToOne(() => Paciente, (paciente) => paciente.prontuarios)
  @JoinColumn({ name: 'PacienteID' })
  paciente: Paciente;
}