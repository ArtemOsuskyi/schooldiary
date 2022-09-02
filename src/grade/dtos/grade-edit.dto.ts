import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { GradeType } from '../../db/enums/grade_type.enum';
import { nowDateIso } from '../../constants';

export class GradeEditDto {
  @ApiProperty({
    example: 11,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(12)
  value: number;

  @ApiProperty({
    example: 'Yearly',
  })
  @IsEnum(GradeType)
  @IsOptional()
  gradeType: GradeType;

  @ApiProperty({
    example: nowDateIso,
  })
  @IsISO8601()
  @IsOptional()
  date: Date;

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
  subjectId: number;

  @ApiProperty({
    example: 3,
  })
  @IsNumber()
  @IsOptional()
  lessonNumber: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  teacherId: number;
}
