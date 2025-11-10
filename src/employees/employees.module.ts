import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employee.entity';
import { ContactInfo } from '../contact-info.entity';
import { CqrsModule } from '@nestjs/cqrs';

// 1. Importe os Handlers
import { GetEmployeeHandler } from './queries/get-employee.handler';
import { CreateEmployeeHandler } from './commands/create-employee.handler';

// 2. Crie listas
export const QueryHandlers = [GetEmployeeHandler];
export const CommandHandlers = [CreateEmployeeHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Employee, ContactInfo])],
  controllers: [EmployeesController],
  providers: [
    // 3. Registre os Handlers
    ...QueryHandlers,
    ...CommandHandlers,
  ],
})
export class EmployeesModule {}
