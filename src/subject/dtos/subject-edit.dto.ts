import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class SubjectEditDto {
  @ApiProperty({
    example: 'Math',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  teacherId: number;
}
