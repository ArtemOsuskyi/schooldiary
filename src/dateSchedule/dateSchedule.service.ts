import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DateSchedule } from '../db/entities';
import { DateScheduleCreateBodyDto } from './dtos/dateSchedule-create.dto';
import { DateScheduleRepository } from './repository/dateSchedule.repository';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class DateScheduleService {
  constructor(
    private readonly dateScheduleRepository: DateScheduleRepository,
    private readonly scheduleService: ScheduleService,
  ) {}

  async createDateSchedule(
    dateScheduleCreateDto: DateScheduleCreateBodyDto,
  ): Promise<DateSchedule> {
    const { scheduleId, date } = dateScheduleCreateDto;
    const schedule = await this.scheduleService.getSchedule(scheduleId);
    return this.dateScheduleRepository.save({
      schedule,
      date,
    });
  }

  async getDataSchedule(dataScheduleId: number): Promise<DateSchedule> {
    return await this.dateScheduleRepository.getDateScheduleById(
      dataScheduleId,
    );
  }
}
