import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicosModule } from './medicos/medicos.module';
import { ProntuariosModule } from './prontuarios/prontuarios.module';
import { ConsultasModule } from './consultas/consultas.module';
import { DiagnosticosModule } from './diagnosticos/diagnosticos.module';
import { TestesAplicadosModule } from './testes-aplicados/testes-aplicados.module';
import { DocumentosModule } from './documentos/documentos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Paciente } from './pacientes/paciente.entity';
import { Medico } from './medicos/medico.entity';
import { Prontuario } from './prontuarios/prontuario.entity';
import { Consulta } from './consultas/consulta.entity';
import { Diagnostico } from './diagnosticos/diagnostico.entity';
import { TesteAplicado } from './testes-aplicados/teste-aplicado.entity';
import { Documento } from './documentos/documento.entity';
import { User } from './users/user.entity';

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
        entities: [
          Paciente,
          Medico,
          Prontuario,
          Consulta,
          Diagnostico,
          TesteAplicado,
          Documento,
          User,
        ],
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
  providers: [AppService],
})
export class AppModule {}
