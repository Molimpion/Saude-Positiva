import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { Paciente } from './paciente.entity';
import { PacientesController } from './pacientes.controller';

import { CreatePacienteHandler } from './commands/create-paciente.handler';
import { UpdatePacienteHandler } from './commands/update-paciente.handler';

import { GetPacienteHandler } from './queries/get-paciente.handler';

export const CommandHandlers = [CreatePacienteHandler, UpdatePacienteHandler];

export const QueryHandlers = [GetPacienteHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Paciente])],
  controllers: [PacientesController],
  providers: [...CommandHandlers, ...QueryHandlers],

  exports: [TypeOrmModule, CqrsModule],
})
export class PacientesModule {}
