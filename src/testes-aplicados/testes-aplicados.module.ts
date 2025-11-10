// src/testes-aplicados/testes-aplicados.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TesteAplicado } from './teste-aplicado.entity';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TesteAplicado]), // Registra a entidade TesteAplicado
  ],
  controllers: [],
  providers: [],
})
export class TestesAplicadosModule {}
