import { ApiProperty } from '@nestjs/swagger';
import { nowDateIso } from '../../constants';
import { IsISO8601, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class NaCountDto {
  @ApiProperty({
    required: true,
    example: nowDateIso,
  })
  @IsISO8601()
  @IsNotEmpty()
  fromDate: Date;

  @ApiProperty({
    required: true,
    example: nowDateIso,
  })
  @IsISO8601()
  @IsNotEmpty()
  toDate: Date;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  studentId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  studyClassId: number;
}
