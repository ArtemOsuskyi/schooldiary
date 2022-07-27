import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

export class StudentCreateDto {
  @IsString()
  @Max(20)
  first_name: string;

  @IsString()
  @Max(20)
  last_name: string;

  @IsString()
  @Max(20)
  patronymic: string;

  @IsNumber()
  @IsNotEmpty()
  studyCourseId: number;
}
