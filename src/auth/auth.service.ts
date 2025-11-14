
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PacientesService } from '../pacientes/pacientes.service';
import { CreatePacienteDto } from '../pacientes/dto/create-paciente.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly pacientesService: PacientesService,
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

  async login(user: any) {
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

    const paciente = await this.pacientesService.create(
      createPacienteDto,
      user,
    );

    return { user, paciente };
  }
}
