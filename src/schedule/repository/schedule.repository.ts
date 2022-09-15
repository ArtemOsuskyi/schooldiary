import { Repository } from 'typeorm';
import { Schedule } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';
import { isNil } from '@nestjs/common/utils/shared.utils';

@CustomRepository(Schedule)
export class ScheduleRepository extends Repository<Schedule> {
  async searchSchedule(
    className?: string,
    dateScheduleId?: number,
    teacherId?: number,
    studyCourseId?: number,
  ): Promise<Schedule[]> {
    return this.find({
      where: {
        ...(!isNil(className) && {
          studyCourse: { studyClass: { name: className } },
        }),
        ...(!isNil(dateScheduleId) && {
          dateSchedule: { id: dateScheduleId },
        }),
        ...(!isNil(teacherId) && {
          teacher: { id: teacherId },
        }),
        ...(!isNil(studyCourseId) && {
          studyCourse: { id: studyCourseId },
        }),
      },
      relations: {
        subject: true,
        dateSchedule: true,
        teacher: true,
        studyCourse: true,
      },
    });
  }
}
