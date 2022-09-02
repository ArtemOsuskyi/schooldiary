import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class NaEditDto {
  @ApiProperty({
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  dateScheduleId: number;

  @ApiProperty({
    example: 'Family issues',
  })
  @IsString()
  @IsOptional()
  reason: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  studentId: number;
}
