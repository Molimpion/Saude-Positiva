import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO para o ContactInfo aninhado (como em [00:20:21])
class CreateContactInfoDto {
  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  email: string;
}

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  managerId: number;

  @IsOptional()
  @ValidateNested() // Valida o objeto aninhado
  @Type(() => CreateContactInfoDto)
  contactInfo: CreateContactInfoDto;
}
