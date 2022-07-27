import { IsDate, IsNotEmpty } from 'class-validator';

export class StudyYearCreateDto {
  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @IsDate()
  @IsNotEmpty()
  end_date: Date;
}
