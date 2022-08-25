import { FindManyOptions, Repository } from 'typeorm';
import { NA } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(NA)
export class NaRepository extends Repository<NA> {
  async getStudentNa(
    studentId: number,
    options?: FindManyOptions<NA>,
  ): Promise<NA[]> {
    return await this.find({
      where: {
        student: { id: studentId },
      },
    });
  }

  async getStudentNaByDate(studentId: number, date: Date): Promise<NA[]> {
    return await this.getStudentNa(studentId, {
      where: {
        dateSchedule: { date },
      },
    });
  }
}
