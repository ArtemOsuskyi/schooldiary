import { IsNumber, IsObject, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudentCreateBodyDto {
  @ApiProperty({
    required: true,
    example: 'Artem',
    type: String,
  })
  @IsString()
  @Length(2, 20)
  firstName: string;

  @ApiProperty({
    required: true,
    example: 'Osuskyi',
    type: String,
  })
  @IsString()
  @Length(2, 20)
  lastName: string;

  @ApiProperty({
    required: true,
    example: 'Viktorovich',
    type: String,
  })
  @IsString()
  @Length(2, 20)
  patronymic: string;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  studyYearId: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  studyClassId: number;
}

export class StudentCreateDto {
  @ApiProperty({ required: true })
  @IsObject()
  student: StudentCreateBodyDto;
}
