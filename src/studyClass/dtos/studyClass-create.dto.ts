import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StudyClassCreateDto {
  @ApiProperty({
    description: 'Class name',
    required: true,
    example: '9A',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class StudyClassDto {
  @ApiProperty({
    example: StudyClassCreateDto,
  })
  studyClass: StudyClassCreateDto;
}
