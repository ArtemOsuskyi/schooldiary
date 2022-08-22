import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeacherSubjectService } from './teacherSubject.service';
import { TeacherSubject } from '../db/entities';

@ApiTags('teacherSubject')
@Controller('teacherSubject')
export class TeacherSubjectController {
  constructor(private readonly teacherSubjectService: TeacherSubjectService) {}

  @Get('/getAll')
  async getAllTeacherSubjects(): Promise<TeacherSubject[]> {
    return this.teacherSubjectService.getAllTeacherSubjects();
  }
}
