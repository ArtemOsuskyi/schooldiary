import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  Length,
} from 'class-validator';
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
}

export class RegisterDto {
  @IsObject()
  register: RegisterBodyDto;
}
