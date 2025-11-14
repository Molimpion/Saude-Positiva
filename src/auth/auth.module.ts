// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
// import { PacientesModule } from '../pacientes/pacientes.module'; // <-- REMOVA
import { CqrsModule } from '@nestjs/cqrs'; // <-- ADICIONE
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    // PacientesModule, // <-- REMOVA
    CqrsModule, // <-- ADICIONE
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret, //
      signOptions: { expiresIn: '60s' }, //
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
