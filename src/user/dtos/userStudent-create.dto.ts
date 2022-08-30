import { IsNotEmpty, IsObject } from 'class-validator';
import { RegisterBodyDto, RegisterDto } from '../../auth/dtos/register-dto';
import {
  StudentCreateBodyDto,
  StudentCreateDto,
} from '../../student/dtos/student-create.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserStudentCreateBodyDto {
  @ApiProperty({
    example: RegisterDto,
    required: true,
  })
  @IsObject()
  @IsNotEmpty()
  user: RegisterBodyDto;

  @ApiProperty({
    example: StudentCreateDto,
    required: true,
  })
  @IsObject()
  @IsNotEmpty()
  student: StudentCreateBodyDto;
}

export class UserStudentCreateDto {
  @IsObject()
  userStudent: UserStudentCreateBodyDto;
}
