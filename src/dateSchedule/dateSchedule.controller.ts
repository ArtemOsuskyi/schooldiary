import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DateSchedule } from '../db/entities';
import { DateScheduleService } from './dateSchedule.service';
import { DateScheduleCreateBodyDto } from './dtos/dateSchedule-create.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';

@ApiTags('dateSchedule')
@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Delete('/delete/:dateScheduleId')
  async deleteDateSchedule(
    @Param('dateScheduleId') dateScheduleId: number,
  ): Promise<DateSchedule> {
    return this.dateScheduleService.deleteDateSchedule(dateScheduleId);
  }
}
