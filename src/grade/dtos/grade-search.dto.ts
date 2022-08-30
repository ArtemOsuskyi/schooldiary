import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { GradeType } from '../../db/enums/grade_type.enum';

export class GradeSearchDto {
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
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  studentId: number;

  @ApiProperty({
    example: 'Math',
  })
  @IsString()
  @IsOptional()
  subjectName: string;
}
