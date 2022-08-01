import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBodyDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User email',
    example: 'a.osuskyi@gmail.com',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @ApiProperty({
    description: 'User password',
    example: 'supersecretpassword',
    required: true,
  })
  password: string;
}

export class LoginDto {
  @IsObject()
  login: LoginBodyDto;
}
