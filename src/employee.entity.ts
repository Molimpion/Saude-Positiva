// 1. Adicione OneToMany ao import
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ContactInfo } from './contact-info.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  managerId: number;

  // MUITOS Employees (subordinados) têm UM manager
  @ManyToOne(() => Employee, (employee) => employee.directReports, {
    nullable: true,
  })
  @JoinColumn({ name: 'managerId' })
  manager: Employee;

  // UM Employee (manager) tem MUITOS subordinates (directReports)
  // Esta era a linha com o erro
  @OneToMany(() => Employee, (employee) => employee.manager) // CORRIGIDO: Era @OneToOne
  directReports: Employee[]; // O tipo Array está correto

  // Relação OneToOne com ContactInfo
  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee, {
    cascade: true,
  })
  @JoinColumn()
  contactInfo: ContactInfo;
}
