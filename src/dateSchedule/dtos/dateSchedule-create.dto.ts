import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber } from 'class-validator';
import { nowDateIso } from '../../constants';

export class DateScheduleCreateBodyDto {
  @ApiProperty({
    required: true,
    example: 1,
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
    example: nowDateIso,
  })
  @IsISO8601()
  date: Date;
}

export class DateScheduleCreateDto {
  @ApiProperty({
    required: true,
  })
  dateSchedule: DateScheduleCreateBodyDto;
}
