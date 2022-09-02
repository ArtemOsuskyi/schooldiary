import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { GradeType } from '../../db/enums/grade_type.enum';

export class GradeAverageDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  classId: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  subjectId: number;

  @ApiProperty({
    required: true,
    example: GradeType.HOMEWORK,
  })
  @IsEnum(GradeType)
  @IsNotEmpty()
  gradeType: GradeType;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  studyYearId: number;
}
