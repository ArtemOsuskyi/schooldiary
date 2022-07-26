import { ApiProperty } from '@nestjs/swagger';
import { nowDateIso } from '../../constants';
import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';

export class NaSearchCurrentStudentDto {
  @ApiProperty({
    example: nowDateIso,
  })
  @IsISO8601()
  @IsOptional()
  date: Date;

  @ApiProperty({
    example: 'Math',
  })
  @IsString()
  @IsOptional()
  subject: string;

  @ApiProperty({
    example: 'Health issues',
  })
  @IsString()
  @IsOptional()
  reason: string;
}
