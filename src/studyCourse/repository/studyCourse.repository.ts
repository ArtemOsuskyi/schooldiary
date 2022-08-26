import { Repository } from 'typeorm';
import { StudyCourse } from '../../db/entities';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(StudyCourse)
export class StudyCourseRepository extends Repository<StudyCourse> {
  async getStudyCoursesByFilters(
    studentId?: number,
    classId?: number,
    studyYearId?: number,
  ) {
    return await this.find({
      where: {
        ...(!isNil(studentId) && { students: { id: studentId } }),
        ...(!isNil(classId) && { studyClass: { id: classId } }),
        ...(!isNil(studyYearId) && { studyYear: { id: studyYearId } }),
      },
      relations: {
        students: true,
        studyClass: true,
        studyYear: true,
      },
    });
  }
}
