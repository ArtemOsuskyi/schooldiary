import { Injectable } from '@nestjs/common';
import { DateSchedule } from '../db/entities';
import { DateScheduleCreateBodyDto } from './dtos/dateSchedule-create.dto';
import { DateScheduleRepository } from './repository/dateSchedule.repository';

@Injectable()
export class DateScheduleService {
  constructor(
    private readonly dateScheduleRepository: DateScheduleRepository,
  ) {}
  async createDateSchedule(
    dateScheduleCreateDto: DateScheduleCreateBodyDto,
  ): Promise<DateSchedule> {
    const { schedule, date } = dateScheduleCreateDto;
    return this.dateScheduleRepository.save({
      schedule: { id: schedule.id },
      date,
    });
  }
}
