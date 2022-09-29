import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601 } from 'class-validator';

export class NaDateSearchDto {
  @ApiProperty({
    required: true,
    example: '2021-09-01',
  })
  @IsISO8601()
  startDate: Date;

  @ApiProperty({
    required: true,
    example: '2022-05-25',
  })
  @IsISO8601()
  endDate: Date;
}
