import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NaCreateBodyDto {
  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  dateScheduleId: number;

  @ApiProperty({
    required: true,
    example: 'Health issues',
  })
  @IsNotEmpty()
  @IsString()
  reason: string;
}

export class CreateNaDto {
  @ApiProperty({
    required: true,
  })
  @IsObject()
  NA: NaCreateBodyDto;
}
