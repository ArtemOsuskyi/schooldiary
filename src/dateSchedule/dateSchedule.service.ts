import { Injectable, NotFoundException } from '@nestjs/common';
import { DateSchedule } from '../db/entities';
import { DateScheduleCreateBodyDto } from './dtos/dateSchedule-create.dto';
import { DateScheduleRepository } from './repository/dateSchedule.repository';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class DateScheduleService {
  constructor(
    private readonly dateScheduleRepository: DateScheduleRepository,
  ) {}

  async createDateSchedule(
    dateScheduleCreateDto: DateScheduleCreateBodyDto,
  ): Promise<DateSchedule> {
    return this.dateScheduleRepository.save({
      date: dateScheduleCreateDto.date,
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
    // if (isNil(dateSchedule))
    //   return this.dateScheduleRepository.create({ date });
    return await this.dateScheduleRepository.findOne({
      where: {
        date,
      },
    });
  }

  async deleteDateSchedule(dateScheduleId: number): Promise<DateSchedule> {
    const dateSchedule = await this.getDateSchedule(dateScheduleId);
    return await this.dateScheduleRepository.remove(dateSchedule);
  }
}
