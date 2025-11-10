// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // 1. O ConfigModule continua igual
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Use TypeOrmModule.forRootAsync para configurar dinamicamente
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 3. Importe o ConfigModule aqui também
      inject: [ConfigService], // 4. Injete o ConfigService

      // 5. useFactory aguarda a injeção para rodar
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',

        // 6. Use configService.get() para ler as variáveis de ambiente
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432), // Valor padrão 5432
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),

        entities: [],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
