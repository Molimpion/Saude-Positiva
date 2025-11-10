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

// DTOs
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

// Comandos
import { CreatePacienteCommand } from './commands/create-paciente.command';
import { UpdatePacienteCommand } from './commands/update-paciente.command';

// Queries
import { GetPacienteQuery } from './queries/get-paciente.query';

// Entidade (para tipagem)
import { Paciente } from './paciente.entity';

@Controller('pacientes')
export class PacientesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Rota: POST /pacientes
   * Cria um novo paciente no sistema.
   */
  @Post()
  async create(
    @Body() createPacienteDto: CreatePacienteDto,
  ): Promise<Paciente> {
    const command = new CreatePacienteCommand(createPacienteDto);

    return this.commandBus.execute<CreatePacienteCommand, Paciente>(command);
  }

  /**
   * Rota: GET /pacientes/:id
   * Busca um paciente específico pelo ID.
   */
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

  /**
   * Rota: PATCH /pacientes/:id
   * Atualiza parcialmente um paciente existente.
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
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

  // PRÓXIMOS MÉTODOS (DELETE e GET List) SERÃO IMPLEMENTADOS EM SEGUIDA.
}
