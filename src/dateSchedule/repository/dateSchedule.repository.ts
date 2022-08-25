import { Repository } from 'typeorm';
import { DateSchedule } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(DateSchedule)
export class DateScheduleRepository extends Repository<DateSchedule> {
  async getDateScheduleById(dateScheduleId: number): Promise<DateSchedule> {
    return this.findOne({
      where: { id: dateScheduleId },
      relations: {
        homework: true,
        NAs: true,
        grades: true,
      },
    });
  }
}
