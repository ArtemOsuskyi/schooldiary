import { Repository } from 'typeorm';
import { Schedule } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';
import { isNil } from '@nestjs/common/utils/shared.utils';

@CustomRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  async searchSchedule(date?: Date, className?: string): Promise<Schedule[]> {
    return this.find({
      where: {
        ...(!isNil(date) && { dateSchedule: { date } }),
        ...(!isNil(className) && {
          studyCourse: { studyClass: { name: className } },
        }),
      },
      relations: {
        subject: true,
      },
    });
  }
}
