import { FindManyOptions, Repository } from 'typeorm';
import { Grade } from '../../db/entities';
import { GradeType } from '../../db/enums/grade_type.enum';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(Grade)
export class GradeRepository extends Repository<Grade> {
  async getStudentGrades(
    studentId: number,
    options?: FindManyOptions<Grade>,
  ): Promise<Grade[]> {
    return await this.find({
      where: {
        student: { id: studentId },
      },
    });
  }

  async getStudentGradesByType(
    studentId: number,
    gradeType: GradeType,
  ): Promise<Grade[]> {
    return await this.getStudentGrades(studentId, {
      where: {
        gradeType: gradeType,
      },
    });
  }

  async getStudentGradesByValue(
    studentId: number,
    value: number,
  ): Promise<Grade[]> {
    return await this.getStudentGrades(studentId, {
      where: {
        value,
      },
    });
  }

  async getStudentGradesByDate(
    studentId: number,
    date: Date,
  ): Promise<Grade[]> {
    return await this.getStudentGrades(studentId, {
      where: {
        dateSchedule: { date },
      },
    });
  }
}
