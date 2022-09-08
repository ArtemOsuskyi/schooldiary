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
import { ScheduleService } from './schedule.service';
import { Schedule } from '../db/entities';
import { ScheduleCreateBodyDto } from './dtos/schedule-create.dto';
import { ScheduleEditDto } from './dtos/schedule-edit.dto';
import { ApprovedRoles } from '../auth/decorators/role-decorator';
import { Roles } from '../db/enums/roles.enum';

@ApiTags('schedule')
@ApprovedRoles(Roles.ADMIN)
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

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
