import { IsString, Max } from 'class-validator';

export class TeacherCreateDto {
  @IsString()
  @Max(20)
  first_name: string;

  @IsString()
  @Max(20)
  last_name: string;

  @IsString()
  @Max(20)
  patronymic: string;
}
