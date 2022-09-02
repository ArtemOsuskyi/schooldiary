import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString } from 'class-validator';
import { nowDateIso } from '../../constants';

export class HomeworkEditDto {
  @ApiProperty({
    example: 'Some other homework',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: nowDateIso,
  })
  @IsISO8601()
  @IsOptional()
  deadline: Date;

  @ApiProperty({
    example: nowDateIso,
  })
  @IsISO8601()
  @IsOptional()
  date: Date;
}
