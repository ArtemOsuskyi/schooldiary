import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudyCourseService } from './studyCourse.service';
import { StudyCourse } from '../db/entities';
import { StudyCourseCreateBodyDto } from './dtos/study_course-create.dto';

@ApiTags('studyCourse')
@Controller('study-course')
export class StudyCourseController {
  constructor(private readonly studyCourseService: StudyCourseService) {}

  @Get(':studyCourseId')
  async getStudyCourse(
    @Param('studyCourseId') studyCourseId: number,
  ): Promise<StudyCourse> {
    return this.studyCourseService.getStudyCourseById(studyCourseId);
  }

  @Post('/create')
  async createStudyCourse(
    @Body() studyCourseCreateDto: StudyCourseCreateBodyDto,
  ): Promise<StudyCourse> {
    return this.studyCourseService.createStudyCourse(studyCourseCreateDto);
  }
}
