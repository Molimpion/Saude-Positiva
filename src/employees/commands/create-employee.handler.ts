import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEmployeeCommand } from './create-employee.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../employee.entity';
import { ContactInfo } from '../../contact-info.entity';
import { Repository } from 'typeorm';

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeHandler
  implements ICommandHandler<CreateEmployeeCommand>
{
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepository: Repository<ContactInfo>,
  ) {}

  async execute(command: CreateEmployeeCommand): Promise<Employee> {
    // Lógica para criar e salvar (como em [00:22:03])
    const { name, managerId, contactInfo } = command;

    const newContactInfo = this.contactInfoRepository.create(contactInfo);
    await this.contactInfoRepository.save(newContactInfo);

    const newEmployee = this.employeeRepository.create({
      name,
      managerId,
      contactInfo: newContactInfo,
    });

    return this.employeeRepository.save(newEmployee);
  }
}
