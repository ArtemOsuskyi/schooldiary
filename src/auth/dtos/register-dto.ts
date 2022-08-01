import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  Length,
} from 'class-validator';
import { Roles } from '../../db/enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterBodyDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User email',
    example: 'a.osuskyi@gmail.com',
    required: true,
  })
  email: string;

  @IsString()
  @Length(8, 20)
  @ApiProperty({
    description: 'User password',
    example: 'supersecretpassword',
    required: true,
  })
  password: string;

  @IsEnum(Roles)
  @ApiProperty({
    description: 'User role',
    example: 'student',
    required: true,
  })
  role: Roles;
}

export class RegisterDto {
  @IsObject()
  register: RegisterBodyDto;
}
