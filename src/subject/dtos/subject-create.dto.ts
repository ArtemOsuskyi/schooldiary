import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class SubjectCreateBodyDto {
  @ApiProperty({
    required: true,
    example: 'Math',
  })
  @IsString()
  @Length(3, 30, {
    message: 'Subject name must be between 3 and 30 characters',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  teacherId: number;
}
