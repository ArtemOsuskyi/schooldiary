import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional } from 'class-validator';

export class StudyYearEditDto {
  @ApiProperty({
    example: '2022-09-01',
  })
  @IsOptional()
  @IsISO8601()
  startDate: Date;

  @ApiProperty({
    example: '2023-05-29',
  })
  @IsOptional()
  @IsISO8601()
  endDate: Date;
}
