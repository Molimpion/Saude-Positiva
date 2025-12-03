import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @OneToOne(() => Paciente, (paciente) => paciente.user)
  paciente: Paciente;
}