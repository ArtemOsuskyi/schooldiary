import { EntityRepository, Repository } from 'typeorm';
import { DateSchedule } from '../../db/entities';

@EntityRepository(DateSchedule)
export class DateScheduleRepository extends Repository<DateSchedule> {
  async getDateScheduleById(dateScheduleId: number): Promise<DateSchedule> {
    return this.findOne(dateScheduleId);
  }

  async getDateScheduleByDate(date: Date) {
    //TODO: search by date
  }
}
