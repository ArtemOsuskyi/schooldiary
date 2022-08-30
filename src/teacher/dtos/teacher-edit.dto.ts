import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Length } from 'class-validator';

export class TeacherEditDto {
  @ApiProperty({
    example: 'Artem',
    type: String,
  })
  @IsString()
  @IsOptional()
  @Length(2, 20)
  firstName: string;

  @ApiProperty({
    example: 'Osuskyi',
    type: String,
  })
  @IsString()
  @IsOptional()
  @Length(2, 20)
  lastName: string;

  @ApiProperty({
    example: 'Viktorovich',
    type: String,
  })
  @IsString()
  @IsOptional()
  @Length(2, 20)
  patronymic: string;

  @ApiProperty({
    example: [1, 3, 5],
  })
  @IsOptional()
  @IsArray()
  subjectIds: number[];
}
