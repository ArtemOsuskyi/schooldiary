import { ApiProperty } from '@nestjs/swagger';
import { nowDateIso } from '../../constants';
import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class ScheduleSearchDto {
  @ApiProperty({
    example: nowDateIso,
  })
  @IsISO8601()
  @IsOptional()
  date: Date;

  @ApiProperty({
    example: '9-A',
  })
  @IsString()
  @IsOptional()
  className: string;
}
