import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Weekdays } from '../../db/enums/weekday.enum';
import { currentDayOfWeek } from '../../constants';

export class ScheduleEditDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  subjectId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  studyClassId: number;

  @ApiProperty({
    example: currentDayOfWeek,
  })
  @IsEnum(Weekdays)
  @IsOptional()
  weekday: Weekdays;

  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  lessonNumber: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  teacherId: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  studyYearId: number;
}
