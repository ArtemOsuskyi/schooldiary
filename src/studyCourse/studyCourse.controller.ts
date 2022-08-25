import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudyCourseService } from './studyCourse.service';
import { StudyCourse } from '../db/entities';
import { StudyCourseCreateBodyDto } from './dtos/studyCourse-create.dto';
import { StudyCourseRemoveStudentDto } from './dtos/studyCourse-removeStudent.dto';
import { StudyCourseSearchDto } from './dtos/studyCourse-search.dto';

@ApiTags('studyCourse')
@Controller('studyCourse')
export class StudyCourseController {
  constructor(private readonly studyCourseService: StudyCourseService) {}

  @Get('/getAll')
  async getAllStudyCourses(): Promise<StudyCourse[]> {
    return this.studyCourseService.getAllStudyCourses();
  }

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

  @Post('/search')
  async searchStudyCourse(@Body() studyCourseSearchDto: StudyCourseSearchDto) {
    return this.studyCourseService.searchStudyCourse(studyCourseSearchDto);
  }

  @Patch('removeStudentFromStudyCourse')
  async removeStudentFromStudyCourse(
    @Body() studentRemoveDto: StudyCourseRemoveStudentDto,
  ) {
    const { studentId, studyCourseId } = studentRemoveDto;
    return await this.studyCourseService.removeStudentFromStudyCourse(
      studentId,
      studyCourseId,
    );
  }
}
