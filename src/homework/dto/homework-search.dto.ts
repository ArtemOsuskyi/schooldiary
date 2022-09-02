import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { nowDateIso } from '../../constants';

export class HomeworkSearchDto {
  @ApiProperty({})
  @IsString()
  @IsOptional()
  @Length(1, 255)
  description: string;

  @ApiProperty({
    example: nowDateIso,
  })
  @IsISO8601()
  @IsOptional()
  deadline: Date;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  dateScheduleId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  subjectId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  teacherId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  studyClassId: number;
}
