import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateEmployeeCommand } from './commands/create-employee.command';
import { GetEmployeeQuery } from './queries/get-employee.query';
import { plainToClass } from 'class-transformer';
import { Employee } from '../employee.entity'; // 1. Precisamos da entidade aqui para o tipo

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const command = plainToClass(CreateEmployeeCommand, createEmployeeDto);

    // 2. CORREÇÃO: Passe o <Comando, Resultado>
    return this.commandBus.execute<CreateEmployeeCommand, Employee>(command);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const query = new GetEmployeeQuery(+id);

    // 3. CORREÇÃO: Passe a <Query, Resultado>
    const employee = await this.queryBus.execute<
      GetEmployeeQuery,
      Employee | null
    >(query);

    if (!employee) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    return employee;
  }
}
