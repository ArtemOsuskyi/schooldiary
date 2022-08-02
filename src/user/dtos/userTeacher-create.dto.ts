import { IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegisterBodyDto, RegisterDto } from '../../auth/dtos/register-dto';
import {
  TeacherCreateBodyDto,
  TeacherCreateDto,
} from '../../teacher/dtos/teacher-create-dto';

export class UserTeacherCreateBodyDto {
  @ApiProperty({
    example: RegisterDto,
    required: true,
  })
  @IsObject()
  @IsNotEmpty()
  user: RegisterBodyDto;

  @ApiProperty({
    example: TeacherCreateDto,
    required: true,
  })
  @IsObject()
  @IsNotEmpty()
  teacher: TeacherCreateBodyDto;
}

export class UserTeacherCreateDto {
  @ApiProperty({
    example: UserTeacherCreateBodyDto,
    required: true,
  })
  @IsObject()
  userStudent: UserTeacherCreateBodyDto;
}
