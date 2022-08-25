import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class StudyCourseSearchDto {
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
  classId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  studyYearId: number;
}
