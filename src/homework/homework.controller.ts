import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { ApiTags } from '@nestjs/swagger';
import { Homework } from '../db/entities';
import { HomeworkCreateBodyDto } from './dto/homework-create.dto';

@ApiTags('homework')
@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Get()
  async getAllHomeworks(): Promise<Homework[]> {
    return await this.homeworkService.getAllHomework();
  }

  @Get(':homeworkId')
  async getHomework(
    @Param('homeworkId') homeworkId: number,
  ): Promise<Homework> {
    return await this.homeworkService.getHomework(homeworkId);
  }

  @Post('/create')
  async createHomework(
    @Body() homeworkCreateDto: HomeworkCreateBodyDto,
  ): Promise<Homework> {
    return await this.homeworkService.createHomework(homeworkCreateDto);
  }

  @Delete(':homeworkId')
  async deleteHomework(
    @Param('homeworkId') homeworkId: number,
  ): Promise<Homework> {
    return await this.homeworkService.deleteHomework(homeworkId);
  }
}
