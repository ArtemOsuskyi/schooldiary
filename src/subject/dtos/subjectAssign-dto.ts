import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class SubjectAssignDto {
  @ApiProperty({
    required: true,
    example: ['Math', 'Sports', 'Physics'],
  })
  @IsArray()
  @IsNotEmpty()
  subjects: string[];

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  teacherId: number;
}
