// src/pacientes/pacientes.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ZodValidationPipe } from 'nestjs-zod'; // 1. Importe

// 2. Importe dos schemas
import {
  CreatePacienteSchema,
  CreatePacienteDto,
  UpdatePacienteSchema,
  UpdatePacienteDto,
} from './schemas/paciente.schema';

// Comandos
import { CreatePacienteCommand } from './commands/create-paciente.command';
import { UpdatePacienteCommand } from './commands/update-paciente.command';
// ... (imports de Query e Paciente)
import { GetPacienteQuery } from './queries/get-paciente.query';
import { Paciente } from './paciente.entity';

@Controller('pacientes')
export class PacientesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(CreatePacienteSchema)) // 3. Use o Pipe Zod
    createPacienteDto: CreatePacienteDto,
  ): Promise<Paciente> {
    const command = new CreatePacienteCommand(createPacienteDto); // O erro ts(2554) de 'image_a6ac28.png' está corrigido
    return this.commandBus.execute<CreatePacienteCommand, Paciente>(command);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Paciente> {
    const query = new GetPacienteQuery(+id);
    const paciente = await this.queryBus.execute<
      GetPacienteQuery,
      Paciente | null
    >(query);
    if (!paciente) {
      throw new NotFoundException(`Paciente com ID ${id} não encontrado.`);
    }
    return paciente;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdatePacienteSchema)) // 4. Use o Pipe Zod
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<Paciente> {
    const command = new UpdatePacienteCommand(+id, updatePacienteDto);
    try {
      return this.commandBus.execute<UpdatePacienteCommand, Paciente>(command);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }
}
