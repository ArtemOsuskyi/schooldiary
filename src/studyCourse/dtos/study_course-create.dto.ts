import { IsNumber } from 'class-validator';

export class StudyCourseCreateDto {
  @IsNumber()
  student_id: number;

  @IsNumber()
  class_id: number;

  @IsNumber()
  study_year_id: number;
}
