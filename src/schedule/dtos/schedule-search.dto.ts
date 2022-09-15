import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ScheduleSearchDto {
  @ApiProperty({
    example: '9-A',
  })
  @IsString()
  @IsOptional()
  className: string;
}
