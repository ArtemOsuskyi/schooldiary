import { EntityRepository, Repository } from 'typeorm';
import { StudyCourse } from '../../db/entities';
import { isNil } from '@nestjs/common/utils/shared.utils';

@EntityRepository(StudyCourse)
export class StudyCourseRepository extends Repository<StudyCourse> {
  private readonly tableAlias = 'studyCourse';

  async getStudyCoursesByFilters(
    studentId?: number,
    classId?: number,
    studyYearId?: number,
  ) {
    return await this.find({
      where: {
        students: { id: studentId },
        // fix above
        ...(!isNil(classId) && { studyClass: { id: classId } }),
        ...(!isNil(studyYearId) && { studyYear: { id: studyYearId } }),
      },
      // where: (qb) => {
      //   qb.where(`student_id = ${studentId}`);
      // qb.where(`studyYear.id = ${studyYearId}`);
      // },
      relations: ['students', 'studyClass', 'studyYear'],
    });
  }
}