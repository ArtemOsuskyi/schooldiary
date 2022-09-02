import { Repository } from 'typeorm';
import { Grade } from '../../db/entities';
import { GradeType } from '../../db/enums/grade_type.enum';
import { CustomRepository } from '../../db/typeorm_ex.decorator';
import { isNil } from '@nestjs/common/utils/shared.utils';

@CustomRepository(Grade)
export class GradeRepository extends Repository<Grade> {
  async searchGrades(
    value?: number,
    gradeType?: GradeType,
    studentId?: number,
    subjectName?: string,
  ) {
    return await this.find({
      where: {
        ...(!isNil(value) && { value }),
        ...(!isNil(gradeType) && { gradeType }),
        ...(!isNil(studentId) && { student: { id: studentId } }),
        ...(!isNil(subjectName) && {
          dateSchedule: { schedule: { subject: { name: subjectName } } },
        }),
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
