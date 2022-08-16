import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudyCourseCreateBodyDto {
  // @ApiProperty({
  //   required: true,
  //   example: 1,
  // })
  // @IsNumber()
  // studentId: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  classId: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  studyYearId: number;
}

export class StudyCourseCreateDto {
  @ApiProperty({
    required: true,
  })
  studyCourse: StudyCourseCreateBodyDto;
}
