import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Prontuario } from '../prontuarios/prontuario.entity';
import { Consulta } from '../consultas/consulta.entity';

@Entity()
export class Medico {
  @PrimaryGeneratedColumn()
  MedicoID: number;

  @Column()
  NomeCompleto: string;

  @Column({ unique: true })
  CRM: string;

  @Column({ unique: true })
  Email: string;

  @Column({ nullable: true })
  Telefone: string;

  @Column({ nullable: true })
  Especialidade: string;

  // Um Médico pode ser responsável por vários Prontuarios
  @OneToMany(() => Prontuario, (prontuario) => prontuario.medicoResponsavel)
  prontuariosResponsavel: Prontuario[];

  // Um Médico pode realizar várias Consultas
  @OneToMany(() => Consulta, (consulta) => consulta.medico)
  consultas: Consulta[];
}
