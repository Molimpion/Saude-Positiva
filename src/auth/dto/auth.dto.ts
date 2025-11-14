
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'O e-mail cadastrado.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'A senha cadastrada.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
