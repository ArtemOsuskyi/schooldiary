import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DateSchedule } from '../db/entities';
import { DateScheduleService } from './dateSchedule.service';
import { DateScheduleCreateBodyDto } from './dtos/dateSchedule-create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('dateSchedule')
@Controller('dateSchedule')
export class DateScheduleController {
  constructor(private readonly dateScheduleService: DateScheduleService) {}

  @Get(':dateScheduleId')
  async getSchedule(
    @Param('dateScheduleId') dateScheduleId: number,
  ): Promise<DateSchedule> {
    return this.dateScheduleService.getDateSchedule(dateScheduleId);
  }

  @Post('/create')
  async createSchedule(
    @Body() dateScheduleCreateDto: DateScheduleCreateBodyDto,
  ): Promise<DateSchedule> {
    return this.dateScheduleService.createDateSchedule(dateScheduleCreateDto);
  }
}
