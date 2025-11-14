
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';

@Entity()
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
