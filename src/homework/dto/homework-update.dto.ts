import { PartialType } from '@nestjs/mapped-types';
import { HomeworkCreateDto } from './homework-create.dto';

export class HomeworkUpdateDto extends PartialType(HomeworkCreateDto) {}
