import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubjectService } from './subject.service';
import { Subject } from '../db/entities';
import { SubjectCreateBodyDto } from './dtos/subject-create.dto';
import { SubjectAssignDto } from './dtos/subject-assign.dto';
import { SubjectSearchDto } from './dtos/subject-search.dto';
import { SubjectEditDto } from './dtos/subject-edit.dto';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('getAll')
  async getAllSubjects(): Promise<Subject[]> {
    return this.subjectService.getAllSubjects();
  }

  @Get(':subjectId')
  async getSubject(@Param('subjectId') subjectId: number): Promise<Subject> {
    return this.subjectService.getSubject(subjectId);
  }

  @Post('/testNames')
  async testSearchByNames(@Body() names: string[]) {
    return await this.subjectService.getTeacherBySubjects(names);
  }

  @Post('/create')
  async createSubject(
    @Body() subjectCreateDto: SubjectCreateBodyDto,
  ): Promise<Subject> {
    const { name, teacherId } = subjectCreateDto;
    return this.subjectService.createSubject(name, teacherId);
  }

  @Patch('/edit/:subjectId')
  async editSubject(
    @Param('subjectId') subjectId: number,
    @Body() subjectEditDto: SubjectEditDto,
  ) {
    return this.subjectService.editSubject(subjectId, subjectEditDto);
  }

  @Post('/assignSubjectsToTeacher')
  async assignSubjectsToTeacher(@Body() subjectAssignDto: SubjectAssignDto) {
    const { subjects, teacherId } = subjectAssignDto;
    return await this.subjectService.assignSubjectsToTeacher(
      subjects,
      teacherId,
    );
  }

  @Post('/search')
  async searchObjects(@Body() subjectSearchDto: SubjectSearchDto) {
    return await this.subjectService.searchSubject(subjectSearchDto);
  }

  @Delete('/delete/:subjectId')
  async deleteSubject(@Param('subjectId') subjectId: number): Promise<Subject> {
    return this.subjectService.deleteSubject(subjectId);
  }
}
