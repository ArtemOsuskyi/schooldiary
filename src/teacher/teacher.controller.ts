import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Teacher } from '../db/entities';
import { StudentCreateDto } from '../student/dtos/student-create-dto';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async getAllTeachers(): Promise<Teacher[]> {
    return this.teacherService.getAllTeachers();
  }

  @Get(':id')
  async getTeacher(@Param() params): Promise<Teacher> {
    return this.teacherService.getTeacher(params.id);
  }

  @Post('create')
  async createStudent(
    @Body() createStudentDto: StudentCreateDto,
  ): Promise<Teacher> {
    return this.teacherService.createTeacher(createStudentDto);
  }

  @Delete('delete/:id')
  async deleteStudent(@Param() params): Promise<Teacher> {
    return this.teacherService.deleteTeacher(params.id);
  }
}
