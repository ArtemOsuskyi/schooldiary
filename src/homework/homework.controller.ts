import { Controller } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('homework')
@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  //TODO: homework routes
}
