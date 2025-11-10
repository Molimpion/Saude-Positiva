import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetEmployeeQuery } from './get-employee.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../employee.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetEmployeeQuery)
export class GetEmployeeHandler implements IQueryHandler<GetEmployeeQuery> {
  constructor(
    // Em vez do DataSource, vamos usar o Repositório, que é mais simples
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async execute(query: GetEmployeeQuery) {
    // A lógica de busca (como em [00:12:23])
    return this.employeeRepository.findOne({
      where: { id: query.id },
      relations: ['contactInfo'], // Traz o Join
    });
  }
}
