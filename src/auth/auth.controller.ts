// src/auth/auth.controller.ts
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod'; // 1. Importe

// 2. Importe dos schemas
import {
  CreatePacienteSchema,
  CreatePacienteDto,
} from '../pacientes/schemas/paciente.schema';
import { LoginSchema, LoginDto } from './schemas/auth.schema';

class LocalAuthGuard extends AuthGuard('local') {} //

@ApiTags('auth') //
@Controller('auth') //
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto }) // Swagger ainda pode usar o tipo inferido
  async login(
    @Request() req,
    @Body(new ZodValidationPipe(LoginSchema)) loginDto: LoginDto, // 3. Use o Pipe Zod
  ) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(
    @Body(new ZodValidationPipe(CreatePacienteSchema)) // 4. Use o Pipe Zod
    createPacienteDto: CreatePacienteDto,
  ) {
    return this.authService.signup(createPacienteDto);
  }
}
