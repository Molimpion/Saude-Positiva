import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Paciente } from "../pacientes/paciente.entity";
import { Medico } from "../medicos/medicos.entity";
import { Prontuario } from "../prontuarios/prontuario.entity";

@Entity()
export class Consulta {
  @PrimaryGeneratedColumn()
  ConsultaID: number;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: "PacienteID" })
  paciente: Paciente;

  @ManyToOne(() => Medico)
  @JoinColumn({ name: "MedicoID" })
  medico: Medico;

  @ManyToOne(() => Prontuario, (prontuario) => prontuario.consultas)
  @JoinColumn({ name: "ProntuarioID" })
  prontuario: Prontuario;

  @Column() // 
  PacienteID: number;

  @Column()
  MedicoID: number; 

  @Column({ type: 'date', nullable: true })
  Data: Date;

  @Column({ nullable: true })
  Hora: string;

  @Column({ nullable: true })
  Motivo: string;
}
