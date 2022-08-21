import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsISO8601, IsNumber, IsString, Length } from 'class-validator';
import { DateSchedule } from '../../db/entities';

export class HomeworkCreateBodyDto {
  @ApiProperty({
    required: true,
  })
  dateSchedule: DateSchedule;

  @IsString()
  @Length(1, 255)
  description: string;

  @ApiProperty({
    required: true,
  })
  @IsISO8601()
  deadline: Date;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  dateScheduleId: number;
}

export class HomeworkCreateDto {
  @ApiProperty({
    required: true,
  })
  homework: HomeworkCreateBodyDto;
}
