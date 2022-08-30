import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class StudentEditDto {
  @ApiProperty({
    required: true,
    example: 'Artem',
    type: String,
  })
  @IsString()
  @IsOptional()
  @Length(2, 20)
  firstName: string;

  @ApiProperty({
    required: true,
    example: 'Osuskyi',
    type: String,
  })
  @IsString()
  @IsOptional()
  @Length(2, 20)
  lastName: string;

  @ApiProperty({
    required: true,
    example: 'Viktorovich',
    type: String,
  })
  @IsString()
  @IsOptional()
  @Length(2, 20)
  patronymic: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  studyYearId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  studyClassId: number;
}
