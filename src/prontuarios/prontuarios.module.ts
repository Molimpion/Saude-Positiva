// src/prontuarios/prontuarios.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Prontuario } from './prontuario.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Prontuario]), // Registra a entidade Prontuario
  ],
  controllers: [],
  providers: [],
})
export class ProntuariosModule {}
