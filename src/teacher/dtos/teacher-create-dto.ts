import { IsObject, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TeacherCreateBodyDto {
  @ApiProperty({
    required: true,
    example: 'Artem',
    type: String,
  })
  @IsString()
  @Length(2, 20)
  first_name: string;

  @ApiProperty({
    required: true,
    example: 'Osuskyi',
    type: String,
  })
  @IsString()
  @Length(2, 20)
  last_name: string;

  @ApiProperty({
    required: true,
    example: 'Viktorovich',
    type: String,
  })
  @IsString()
  @Length(2, 20)
  patronymic: string;
}

export class TeacherCreateDto {
  @ApiProperty({ required: true })
  @IsObject()
  teacher: TeacherCreateBodyDto;
}
