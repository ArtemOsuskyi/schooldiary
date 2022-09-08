import { GradeType } from '../../db/enums/grade_type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class GradeSearchCurrentStudentDto {
  @ApiProperty({
    example: 9,
  })
  @IsNumber()
  @IsOptional()
  value: number;

  @ApiProperty({
    example: 'Test',
  })
  @IsEnum(GradeType)
  @IsOptional()
  gradeType: GradeType;

  @ApiProperty({
    example: 'Math',
  })
  @IsString()
  @IsOptional()
  subjectName: string;
}
