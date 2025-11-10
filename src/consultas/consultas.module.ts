// src/consultas/consultas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Consulta } from './consulta.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Consulta]), // Registra a entidade Consulta
  ],
  controllers: [],
  providers: [],
})
export class ConsultasModule {}
