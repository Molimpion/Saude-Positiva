import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Paciente } from "../pacientes/paciente.entity";
import { Medico } from "../medicos/medicos.entity";
import { Prontuario } from "../prontuarios/prontuario.entity";

@Entity("consultas")
export class Consulta {
  @PrimaryGeneratedColumn()
  ConsultaID: number;

  @Column()
  PacienteID: number;

  @Column()
  MedicoID: number;

  @Column({ nullable: true })
  ProntuarioID: number;

  @Column({ type: 'date' })
  Data: Date;

  @Column()
  Hora: string;

  @Column({ type: 'text', nullable: true })
  Motivo: string;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: "PacienteID" })
  paciente: Paciente;

  @ManyToOne(() => Medico)
  @JoinColumn({ name: "MedicoID" })
  medico: Medico;

  @ManyToOne(() => Prontuario)
  @JoinColumn({ name: "ProntuarioID" })
  prontuario: Prontuario;
}