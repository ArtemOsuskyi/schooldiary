import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudyClassCreateDto } from './dtos/studyClass-create.dto';
import { StudyClass } from '../db/entities';
import { StudyClassService } from './studyClass.service';

@ApiTags('studyClass')
@Controller('studyClass')
export class StudyClassController {
  constructor(private readonly studyClassService: StudyClassService) {}

  @Post('/create')
  async createStudyClass(
    @Body() studyClassCreateDto: StudyClassCreateDto,
  ): Promise<StudyClass> {
    return await this.studyClassService.createClass(studyClassCreateDto);
  }

  @Delete('/delete/:classId')
  async deleteStudyClass(
    @Param('classId') classId: number,
  ): Promise<StudyClass> {
    return await this.studyClassService.removeClass(classId);
  }
}
