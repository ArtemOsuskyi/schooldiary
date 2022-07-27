import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { Grade } from '../../db/entities';
import { GradeType } from '../../db/enums/grade_type.enum';

@EntityRepository(Grade)
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
        grade_type: gradeType,
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
        date_schedule: { date },
      },
    });
  }
}
