import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class TeacherSearchDto {
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
    example: ['Math', 'Sports', 'English'],
  })
  @IsArray()
  @IsOptional()
  subjects: string[];
}
