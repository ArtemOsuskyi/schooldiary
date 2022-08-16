import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class StudentSearchByFullNameDto {
  @ApiProperty({
    required: false,
    example: 'Artem',
  })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({
    required: false,
    example: 'Osuskyi',
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    required: false,
    example: 'Viktorovich',
  })
  @IsString()
  @IsOptional()
  patronymic: string;
}
