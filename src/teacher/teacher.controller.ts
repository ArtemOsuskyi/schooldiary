import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Teacher } from '../db/entities';
import { TeacherService } from './teacher.service';
import { TeacherCreateBodyDto } from './dtos/teacher-create.dto';
import { TeacherSearchDto } from './dtos/teacher-search.dto';
import { TeacherEditDto } from './dtos/teacher-edit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { ApprovedRoles } from '../auth/decorators/role-decorator';
import { Roles } from '../db/enums/roles.enum';

@ApiTags('teacher')
@ApprovedRoles(Roles.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Patch('/edit/:teacherId')
  async editTeacher(
    @Param('teacherId') teacherId: number,
    @Body() teacherEditDto: TeacherEditDto,
  ) {
    return this.teacherService.editTeacher(teacherId, teacherEditDto);
  }

  @Post('/search')
  async searchTeacher(
    @Body() teacherSearchDto: TeacherSearchDto,
  ): Promise<Teacher[]> {
    return this.teacherService.searchTeacherByFilters(teacherSearchDto);
  }

  @ApiExcludeEndpoint()
  @Post('create')
  async createTeacher(
    @Body() createTeacherDto: TeacherCreateBodyDto,
  ): Promise<Teacher> {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Delete('delete/:teacherId')
  async deleteTeacher(@Param('teacherId') teacherId: number): Promise<void> {
    return this.teacherService.deleteTeacher(teacherId);
  }
}
