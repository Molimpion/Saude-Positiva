import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class ContactInfo {
  @PrimaryGeneratedColumn()
  id: number;

  // Como visto em [00:08:16]
  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  // O lado inverso da relação
  @OneToOne(() => Employee, employee => employee.contactInfo)
  employee: Employee;
}
