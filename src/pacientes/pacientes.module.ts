// src/pacientes/pacientes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

// Entidade e Controller
import { Paciente } from './paciente.entity';
import { PacientesController } from './pacientes.controller';

// COMANDOS (Escrita)
import { CreatePacienteHandler } from './commands/create-paciente.handler';
import { UpdatePacienteHandler } from './commands/update-paciente.handler';
// (Faltando o DeletePacienteHandler)

// QUERIES (Leitura)
import { GetPacienteHandler } from './queries/get-paciente.handler';
// (Faltando o GetPacientesListHandler)

// 1. Array de todos os Handlers de COMANDO
export const CommandHandlers = [CreatePacienteHandler, UpdatePacienteHandler];

// 2. Array de todos os Handlers de QUERY
export const QueryHandlers = [GetPacienteHandler];

@Module({
  imports: [
    CqrsModule,
    // 3. Registra a entidade Paciente para este módulo
    TypeOrmModule.forFeature([Paciente]),
  ],
  controllers: [
    // 4. Registra o Controller
    PacientesController,
  ],
  providers: [
    // 5. Registra todos os Handlers como Providers do módulo
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  // 6. Exporta módulos ou provedores se outras features (ex: Prontuario) precisarem usar Paciente
  // Por exemplo: se ProntuarioModule precisasse injetar o repositório Paciente, faríamos um 'exports'.
  exports: [TypeOrmModule, CqrsModule],
})
export class PacientesModule {}
