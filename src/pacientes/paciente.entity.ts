import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Prontuario } from '../prontuarios/prontuario.entity';
import { User } from '../users/user.entity';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  PacienteID: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @Column()
  NomeCompleto: string;

  @Column({ type: 'date' })
  DataNascimento: Date;

  @Column({ unique: true })
  CPF: string;

  @Column({ nullable: true })
  Telefone: string;

  @Column({ unique: true })
  Email: string;

  @Column({ nullable: true })
  Endereco: string;

  @Column({ nullable: true })
  EstadoCivil: string;

  @Column({ nullable: true })
  NomeContatoEmergencia: string;

  @Column({ nullable: true })
  TelefoneContatoEmergencia: string;

  // Um Paciente pode ter vários Prontuarios
  @OneToMany(() => Prontuario, (prontuario) => prontuario.paciente)
  prontuarios: Prontuario[];
}
