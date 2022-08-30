import { IsEnum, IsISO8601, IsNumber, Max, Min } from 'class-validator';
import { GradeType } from '../../db/enums/grade_type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { nowDateIso } from '../../constants';

export class GradeCreateBodyDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  studentId: number;

  @ApiProperty({
    required: true,
    example: 9,
  })
  @IsNumber()
  @Min(1)
  @Max(12)
  value: number;

  @ApiProperty({
    required: true,
    example: 1, //YYYY-MM-DD
  })
  @IsNumber()
  dateScheduleId: number;

  @ApiProperty({
    required: true,
    example: 'Test',
  })
  @IsEnum(GradeType)
  gradeType: GradeType;
}

export class GradeCreateDto {
  @ApiProperty({
    required: true,
  })
  grade: GradeCreateBodyDto;
}
