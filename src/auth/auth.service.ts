// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePacienteCommand } from '../pacientes/commands/create-paciente.command';
import { Paciente } from '../pacientes/paciente.entity';
import { CreatePacienteDto } from '../pacientes/schemas/paciente.schema'; // 1. Importando do Schema Zod

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly commandBus: CommandBus, // 2. Injetando o CommandBus
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password_hash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  // 3. CORRIGIDO: Removido 'async' pois não há 'await'
  login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(createPacienteDto: CreatePacienteDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createPacienteDto.password, salt);

    const user = await this.usersService.create({
      email: createPacienteDto.Email,
      password_hash: hashedPassword,
    });

    // 4. Refatorado para usar CQRS
    const command = new CreatePacienteCommand(createPacienteDto, user);
    const paciente = await this.commandBus.execute<
      CreatePacienteCommand,
      Paciente
    >(command);

    return { user, paciente };
  }
}
