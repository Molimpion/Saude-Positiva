// src/diagnosticos/diagnosticos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Diagnostico } from './diagnostico.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Diagnostico]), // Registra a entidade Diagnostico
  ],
  controllers: [],
  providers: [],
})
export class DiagnosticosModule {}
