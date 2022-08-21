import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';
import { nowDate } from '../../constants';

export class DateScheduleCreateBodyDto {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  scheduleId: number;

  // @ApiProperty()
  // homework: Homework[];
  //
  // @ApiProperty()
  // grades: Grade[];
  //
  // @ApiProperty()
  // NAs: NA[];

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
