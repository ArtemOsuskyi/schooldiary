import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ScheduleSearchDto {
  @ApiProperty({
    example: '9-A',
  })
  @IsString()
  @IsOptional()
  className: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  dateScheduleId: number;

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
  studyCourseId: number;
}
