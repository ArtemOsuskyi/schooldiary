import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SubjectSearchDto {
  @ApiProperty({
    example: 'Math',
  })
  @IsString()
  @IsOptional()
  subjectName: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  teacherId: number;
}
