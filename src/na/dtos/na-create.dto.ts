import { IsNumber, IsString } from 'class-validator';

export class NaCreateDto {
  @IsNumber()
  student_id: number;

  @IsNumber()
  date_schedule_id: number;

  @IsString()
  reason: string;
}
