import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class StudyClassCreateDto {
  @ApiProperty({
    description: 'Class name',
    required: true,
    example: '9-A',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/(^[1-9]|^1[0-2])+(-[A-z]+)$/)
  name: string;
}

export class StudyClassDto {
  @ApiProperty({
    example: StudyClassCreateDto,
  })
  studyClass: StudyClassCreateDto;
}
