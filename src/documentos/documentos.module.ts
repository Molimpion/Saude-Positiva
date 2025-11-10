// src/documentos/documentos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Documento } from './documento.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Documento]), // Registra a entidade Documento
  ],
  controllers: [],
  providers: [],
})
export class DocumentosModule {}
