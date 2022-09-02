import { Repository } from 'typeorm';
import { NA } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';
import { isNil } from '@nestjs/common/utils/shared.utils';

@CustomRepository(NA)
export class NaRepository extends Repository<NA> {
  async searchNA(
    date?: Date,
    subject?: string,
    studentId?: number,
    reason?: string,
  ): Promise<NA[]> {
    return await this.find({
      where: {
        ...(!isNil(date) && { dateSchedule: { date } }),
        ...(!isNil(subject) && {
          dateSchedule: { schedule: { subject: { name: subject } } },
        }),
        ...(!isNil(studentId) && { student: { id: studentId } }),
        ...(!isNil(reason) && { reason }),
      },
      relations: {
        student: true,
        dateSchedule: {
          schedule: {
            subject: true,
          },
        },
      },
    });
  }
}
