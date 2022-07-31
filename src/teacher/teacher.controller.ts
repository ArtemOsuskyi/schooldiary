import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Teacher } from '../db/entities';
import { TeacherService } from './teacher.service';
import { TeacherCreateBodyDto } from './dtos/teacher-create-dto';

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
  async createTeacher(
    @Body() createTeacherDto: TeacherCreateBodyDto,
  ): Promise<Teacher> {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Delete('delete/:id')
  async deleteTeacher(@Param() params): Promise<Teacher> {
    return this.teacherService.deleteTeacher(params.id);
  }
}
