import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudyYearService } from './studyYear.service';
import { StudyYearCreateBodyDto } from './dtos/studyYear-create.dto';
import { StudyYear } from '../db/entities';

@ApiTags('studyYear')
@Controller('studyYear')
export class StudyYearController {
  constructor(private readonly studyYearService: StudyYearService) {}

  @Get('/getAll')
  async getAllStudyYears(): Promise<StudyYear[]> {
    return this.studyYearService.getAllStudyYear();
  }

  @Get(':studyYearId')
  async getStudyYear(
    @Param('studyYearId') studyYearId: number,
  ): Promise<StudyYear> {
    return this.studyYearService.getStudyYear(studyYearId);
  }

  @Post('/create')
  async createStudyYear(
    @Body() createStudyYearDto: StudyYearCreateBodyDto,
  ): Promise<StudyYear> {
    return await this.studyYearService.createStudyYear(createStudyYearDto);
  }
}
