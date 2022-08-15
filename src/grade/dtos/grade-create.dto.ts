import { IsDate, IsNumber, Max, Min } from 'class-validator';

export class GradeCreateDto {
  @IsNumber()
  @Min(1)
  @Max(12)
  value: number;

  @IsDate()
  date: Date;
}
