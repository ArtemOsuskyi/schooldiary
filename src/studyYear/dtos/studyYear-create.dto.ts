import { IsDate, IsISO8601, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudyYearCreateBodyDto {
  @IsISO8601()
  @IsNotEmpty()
  @ApiProperty({
    example: '2022-09-01', //YYYY-MM-DD
    required: true,
  })
  start_date: Date;

  @IsISO8601()
  @IsNotEmpty()
  @ApiProperty({
    example: '2022-05-25',
    required: true,
  })
  end_date: Date;
}

export class StudyYearCreateDto {
  @ApiProperty({
    required: true,
  })
  @IsObject()
  studyYear: StudyYearCreateBodyDto;
}
