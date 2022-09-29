import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { Schedule } from '../db/entities';
import { ScheduleCreateBodyDto } from './dtos/schedule-create.dto';
import { ScheduleEditDto } from './dtos/schedule-edit.dto';
import { ApprovedRoles } from '../auth/decorators/role-decorator';
import { Roles } from '../db/enums/roles.enum';
import { ScheduleSearchDto } from './dtos/schedule-search.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../student/student.service';

@ApiTags('schedule')
@ApprovedRoles(Roles.ADMIN, Roles.STUDENT)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('schedule')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly jwtService: JwtService,
    private readonly studentService: StudentService,
  ) {}

  @Get('/getAll')
  async getAllSchedules(): Promise<Schedule[]> {
    return this.scheduleService.getAllSchedules();
  }

  @ApprovedRoles(Roles.TEACHER, Roles.STUDENT)
  @Get(':scheduleId')
  async getSchedule(
    @Param('scheduleId') scheduleId: number,
  ): Promise<Schedule> {
    return this.scheduleService.getSchedule(scheduleId);
  }

  @ApprovedRoles(Roles.STUDENT)
  @Post('/currentStudentSearch')
  async getScheduleForCurrentStudent(@Req() req: Request): Promise<Schedule[]> {
    const userId = await this.jwtService.decode(req.cookies['token'])['id'];
    const student = await this.studentService.getStudentByUserId(userId);
    return await this.scheduleService.getScheduleForCurrentStudent(
      student.id,
      student.studyCourses[0].id,
    );
  }

  @Post('/search')
  async searchSchedule(
    @Body() scheduleSearchDto: ScheduleSearchDto,
  ): Promise<Schedule[]> {
    return await this.scheduleService.searchSchedule(scheduleSearchDto);
  }

  @Post('/create')
  async createSchedule(
    @Body() scheduleCreateDto: ScheduleCreateBodyDto,
  ): Promise<Schedule> {
    return this.scheduleService.createSchedule(scheduleCreateDto);
  }

  @Patch('/edit/:scheduleId')
  async editSchedule(
    @Param('scheduleId') scheduleId: number,
    @Body() scheduleEditDto: ScheduleEditDto,
  ) {
    return await this.scheduleService.editSchedule(scheduleId, scheduleEditDto);
  }

  @Delete('/delete/:scheduleId')
  async deleteSchedule(
    @Param('scheduleId') scheduleId: number,
  ): Promise<Schedule> {
    return this.scheduleService.deleteSchedule(scheduleId);
  }
}
