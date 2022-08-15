import { IsDate, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudyYearCreateBodyDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    example: '01-09-2022',
    required: true,
  })
  start_date: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    example: '25-05-2022',
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
