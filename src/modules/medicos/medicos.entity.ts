import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("medicos")
export class Medico {
  @PrimaryGeneratedColumn()
  MedicoID: number;

  @Column()
  NomeCompleto: string;

  @Column({ unique: true })
  CRM: string;

  @Column()
  Especialidade: string;

  @Column({ nullable: true })
  Telefone: string;

  @Column({ nullable: true })
  Email: string;
}