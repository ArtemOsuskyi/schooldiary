import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Grade, Homework, NA, Schedule } from '../../db/entities';
import { ScheduleCreateDto } from '../../schedule/dtos/schedule-create.dto';
import { nowDate } from '../../constants';

export class DateScheduleCreateBodyDto {
  @ApiProperty({
    required: true,
    example: ScheduleCreateDto,
  })
  schedule: Schedule;

  @ApiProperty()
  homework: Homework[];

  @ApiProperty()
  grades: Grade[];

  @ApiProperty()
  NAs: NA[];

  @ApiProperty({
    required: true,
    example: nowDate,
  })
  @IsDate()
  date: Date;
}

export class DateScheduleCreateDto {
  @ApiProperty({
    required: true,
  })
  dateSchedule: DateScheduleCreateBodyDto;
}
