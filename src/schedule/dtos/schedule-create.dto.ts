import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsObject, Max, Min } from 'class-validator';
import { StudyCourseCreateBodyDto } from '../../studyCourse/dtos/study_course-create.dto';
import { Weekdays } from '../../db/enums/weekday.enum';

export class ScheduleCreateBodyDto {
  @ApiProperty({
    required: true,
    example: StudyCourseCreateBodyDto,
  })
  @IsObject()
  studyCourseId: number;

  @ApiProperty({
    required: true,
  })
  @IsObject()
  dateScheduleId: number;

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
