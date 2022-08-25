import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { SubjectService } from './subject.service';
import { Subject } from '../db/entities';
import { SubjectCreateBodyDto } from './dtos/subject-create.dto';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get(':subjectId')
  async getSubject(@Param('subjectId') subjectId: number): Promise<Subject> {
    return this.subjectService.getSubject(subjectId);
  }

  @Post('/create')
  async createSubject(
    @Body() subjectCreateDto: SubjectCreateBodyDto,
  ): Promise<Subject> {
    const { name, teacherId } = subjectCreateDto;
    return this.subjectService.createSubject(name, teacherId);
  }

  @Delete(':subjectId')
  async deleteSubject(@Param('subjectId') subjectId: number): Promise<Subject> {
    return this.subjectService.deleteSubject(subjectId);
  }
}
