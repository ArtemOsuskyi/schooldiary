import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, Length } from 'class-validator';
import { DateSchedule } from '../../db/entities';

export class HomeworkCreateBodyDto {
  @ApiProperty({
    required: true,
  })
  dateSchedule: DateSchedule;

  @IsString()
  @Length(1, 255)
  description: string;

  @IsDate()
  deadline: Date;
}

export class HomeworkCreateDto {
  @ApiProperty({
    required: true,
  })
  homework: HomeworkCreateBodyDto;
}
