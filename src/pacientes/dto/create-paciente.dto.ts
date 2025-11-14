import {
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePacienteDto {
  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'O e-mail do paciente, que será usado para login.',
  })
  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @ApiProperty({
    example: 'João da Silva',
    description: 'O nome completo do paciente.',
  })
  @IsNotEmpty()
  @IsString()
  NomeCompleto: string;

  @ApiProperty({
    example: '12345678901',
    description: 'O CPF do paciente, contendo 11 dígitos.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(11, 11, { message: 'O CPF deve ter 11 dígitos.' })
  CPF: string;

  @ApiProperty({
    example: '81999887766',
    description: 'O número de telefone do paciente.',
  })
  @IsNotEmpty()
  @IsString()
  Telefone: string;

  @ApiProperty({
    example: 'password123',
    description: 'A senha para acesso do paciente. Mínimo de 8 caracteres.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  password: string;
}
  