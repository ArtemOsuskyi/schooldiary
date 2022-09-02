import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber, IsString, Length } from 'class-validator';
import { nowDateIso } from '../../constants';

export class HomeworkCreateBodyDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @Length(1, 255)
  description: string;

  @ApiProperty({
    required: true,
    example: nowDateIso,
  })
  @IsISO8601()
  deadline: Date;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  dateScheduleId: number;
}

export class HomeworkCreateDto {
  @ApiProperty({
    required: true,
  })
  homework: HomeworkCreateBodyDto;
}
