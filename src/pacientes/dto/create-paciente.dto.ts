// src/pacientes/dto/create-paciente.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  Length,
  IsOptional,
  IsEmail,
  IsIn,
} from 'class-validator';

export class CreatePacienteDto {
  @IsNotEmpty()
  @IsString()
  NomeCompleto: string;

  @IsDateString()
  DataNascimento: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11, { message: 'O CPF deve ter 11 dígitos.' })
  CPF: string;

  @IsOptional()
  @IsString()
  Telefone: string;

  @IsOptional()
  @IsEmail()
  Email: string;

  @IsOptional()
  @IsString()
  Endereco: string;

  @IsOptional()
  @IsIn(['Solteiro', 'Casado', 'Divorciado', 'Viúvo'])
  EstadoCivil: string;

  @IsOptional()
  @IsString()
  NomeContatoEmergencia: string;

  @IsOptional()
  @IsString()
  TelefoneContatoEmergencia: string;
}
