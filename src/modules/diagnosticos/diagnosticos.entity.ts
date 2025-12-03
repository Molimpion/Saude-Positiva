import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Consulta } from "../consultas/consultas.entity";

@Entity("diagnosticos")
export class Diagnostico {
  @PrimaryGeneratedColumn()
  DiagnosticoID: number;

  @Column()
  ConsultaID: number;

  @Column()
  Titulo: string;

  @Column({ type: "text" })
  Descricao: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  DataCriacao: Date;

  @ManyToOne(() => Consulta)
  @JoinColumn({ name: "ConsultaID" })
  consulta: Consulta;
}