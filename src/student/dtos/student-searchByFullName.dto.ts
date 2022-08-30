import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class StudentSearchByFullNameDto {
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
}
