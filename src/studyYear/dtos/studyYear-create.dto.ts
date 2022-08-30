import { IsISO8601, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudyYearCreateBodyDto {
  @IsISO8601()
  @IsNotEmpty()
  @ApiProperty({
    example: '2022-09-01', //YYYY-MM-DD
    required: true,
  })
  startDate: Date;

  @IsISO8601()
  @IsNotEmpty()
  @ApiProperty({
    example: '2023-05-25',
    required: true,
  })
  endDate: Date;
}

export class StudyYearCreateDto {
  @ApiProperty({
    required: true,
  })
  @IsObject()
  studyYear: StudyYearCreateBodyDto;
}
