import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DateSchedule } from '../db/entities';
import { DateScheduleService } from './dateSchedule.service';
import { DateScheduleCreateBodyDto } from './dtos/dateSchedule-create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('dateSchedule')
@Controller('dateSchedule')
export class DateScheduleController {
  constructor(private readonly dateScheduleService: DateScheduleService) {}

  @Get(':scheduleId')
  async getSchedule(
    @Param('scheduleId') scheduleId: number,
  ): Promise<DateSchedule> {
    return this.dateScheduleService.getDateSchedule(scheduleId);
  }

  @Post('/create')
  async createSchedule(
    @Body() dateScheduleCreateDto: DateScheduleCreateBodyDto,
  ): Promise<DateSchedule> {
    return this.dateScheduleService.createDateSchedule(dateScheduleCreateDto);
  }
}
