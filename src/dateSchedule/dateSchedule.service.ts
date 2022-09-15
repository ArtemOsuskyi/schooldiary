import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DateSchedule } from '../db/entities';
import { DateScheduleCreateBodyDto } from './dtos/dateSchedule-create.dto';
import { DateScheduleRepository } from './repository/dateSchedule.repository';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { ScheduleService } from '../schedule/schedule.service';
import { nowDateIso } from '../constants';
import dayjs from 'dayjs';

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
    console.log(dayjs(date).format('dddd'), schedule.weekday);
    if (dayjs(date).format('dddd') !== schedule.weekday) {
      throw new BadRequestException(
        'Cannot attach date with different day of week',
      );
    }
    return this.dateScheduleRepository.save({
      schedule,
      date: date ?? nowDateIso,
    });
  }

  async getAllDateSchedules(): Promise<DateSchedule[]> {
    return this.dateScheduleRepository.find({
      relations: {
        schedule: true,
        homework: true,
        NAs: true,
        grades: true,
      },
    });
  }

  async getDateSchedule(dataScheduleId: number): Promise<DateSchedule> {
    const dateSchedule = await this.dateScheduleRepository.getDateScheduleById(
      dataScheduleId,
    );
    if (isNil(dateSchedule))
      throw new NotFoundException("Date schedule doesn't exist");
    return dateSchedule;
  }

  async getDateScheduleByDate(date: Date): Promise<DateSchedule> {
    const dateSchedule = await this.dateScheduleRepository.findOne({
      where: {
        date,
      },
    });
    return dateSchedule ?? null;
  }

  async deleteDateSchedule(dateScheduleId: number): Promise<DateSchedule> {
    const dateSchedule = await this.getDateSchedule(dateScheduleId);
    return await this.dateScheduleRepository.remove(dateSchedule);
  }
}
