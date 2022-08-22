import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsISO8601, IsNumber, Max, Min } from 'class-validator';
import { Weekdays } from '../../db/enums/weekday.enum';
import { nowDateIso } from '../../constants';

export class ScheduleCreateBodyDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  studyCourseId: number;

  @ApiProperty({
    required: true,
    example: nowDateIso,
  })
  @IsISO8601()
  date: Date;

  @ApiProperty({
    required: true,
    example: 8,
  })
  @IsNumber()
  @Min(1)
  @Max(8)
  lessonNumber: number;

  @ApiProperty({
    required: true,
    example: 'Monday',
  })
  @IsEnum(Weekdays)
  weekday: Weekdays;
}

export class ScheduleCreateDto {
  @ApiProperty({
    required: true,
  })
  schedule: ScheduleCreateBodyDto;
}
