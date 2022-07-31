import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Teacher } from '../db/entities';
import { TeacherService } from './teacher.service';
import {
  TeacherCreateBodyDto,
  TeacherCreateDto,
} from './dtos/teacher-create-dto';

@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get('/all')
  async getAllTeachers(): Promise<Teacher[]> {
    return this.teacherService.getAllTeachers();
  }

  @Get(':teacherId')
  async getTeacher(@Param('teacherId') teacherId: number): Promise<Teacher> {
    return this.teacherService.getTeacher(teacherId);
  }

  @Post('create')
  @ApiResponse({
    status: 201,
    description: 'Teacher created successfully',
    type: TeacherCreateDto,
  })
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
