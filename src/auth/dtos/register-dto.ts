import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { Roles } from '../../db/enums/roles.enum';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;

  @IsEnum(Roles)
  role: Roles;
}
