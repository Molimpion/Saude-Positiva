import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
// O erro aqui é normal até você salvar este arquivo, pois ele busca o Paciente
import { Paciente } from '../pacientes/paciente.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @OneToOne(() => Paciente, (paciente) => paciente.user)
  paciente: Paciente;
}