import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { NA } from '../../db/entities';

@EntityRepository(NA)
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
