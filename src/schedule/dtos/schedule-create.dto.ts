import { ApiProperty } from '@nestjs/swagger';
import { DateSchedule, StudyCourse } from '../../db/entities';
import { IsEnum, IsNumber, IsObject, Max, Min } from 'class-validator';
import { StudyCourseCreateDto } from '../../studyCourse/dtos/study_course-create.dto';
import { Weekdays } from '../../db/enums/weekday.enum';

export class ScheduleCreateBodyDto {
  @ApiProperty({
    required: true,
    example: StudyCourseCreateDto,
  })
  @IsObject()
  studyCourse: StudyCourse;

  @ApiProperty({
    required: true,
  })
  @IsObject()
  dateSchedule: DateSchedule;

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
    example: ScheduleCreateBodyDto,
  })
  schedule: ScheduleCreateBodyDto;
}
