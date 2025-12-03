import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Paciente } from "../pacientes/paciente.entity";
import { Consulta } from "../consultas/consultas.entity";

@Entity("testes_aplicados")
export class TesteAplicado {
  @PrimaryGeneratedColumn()
  TesteID: number;

  @Column()
  Nome: string;

  @Column({ type: "text", nullable: true })
  Descricao: string;

  @Column({ type: "text" })
  Resultado: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  DataAplicacao: Date;

  @Column({ nullable: true })
  ConsultaID: number;

  @ManyToOne(() => Consulta)
  @JoinColumn({ name: "ConsultaID" })
  consulta: Consulta;
}