// src/medicos/medicos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Medico } from './medico.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Medico]), // Registra a entidade Medico
  ],
  controllers: [],
  providers: [],
})
export class MedicosModule {}
