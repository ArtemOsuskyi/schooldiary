import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class StudentSearchDto {
  @ApiProperty({
    example: 'Artem',
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    example: 'Osuskyi',
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    example: 'Viktorovich',
  })
  @IsString()
  @IsOptional()
  patronymic: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  classId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  studyYearId: number;
}
