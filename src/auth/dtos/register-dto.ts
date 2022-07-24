import { IsEmail, IsEnum, IsString, Max, Min } from 'class-validator';
import { Roles }                               from '../../db/enums/roles.enum';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Min(8)
  @Max(20)
  password: string;

  @IsEnum(Roles)
  role: Roles;
}