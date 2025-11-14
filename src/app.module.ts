// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core'; // 1. ADICIONE
import { ZodValidationPipe } from 'nestjs-zod'; // 2. ADICIONE

// Módulos de Feature
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicosModule } from './medicos/medicos.module';
import { ProntuariosModule } from './prontuarios/prontuarios.module';
import { ConsultasModule } from './consultas/consultas.module';
import { DiagnosticosModule } from './diagnosticos/diagnosticos.module';
import { TestesAplicadosModule } from './testes-aplicados/testes-aplicados.module';
import { DocumentosModule } from './documentos/documentos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

// 3. REMOVA TODAS AS 8 IMPORTAÇÕES DE ENTIDADES
// import { Paciente } from './pacientes/paciente.entity'; // <-- DELETE
// import { Medico } from './medicos/medico.entity'; // <-- DELETE
// ...etc.

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),

        // 4. A LISTA DE ENTITIES FICA VAZIA
        entities: [],

        synchronize: true,
      }),
    }),

    // Módulos de Feature
    PacientesModule,
    MedicosModule,
    ProntuariosModule,
    ConsultasModule,
    DiagnosticosModule,
    TestesAplicadosModule,
    DocumentosModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 5. ADICIONE O PIPE GLOBAL DO ZOD
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
