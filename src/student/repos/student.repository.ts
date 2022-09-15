import { ILike, Repository } from 'typeorm';
import { Student } from '../../db/entities';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(Student)
export class StudentRepository extends Repository<Student> {
  async searchStudents(
    firstName?: string,
    lastName?: string,
    patronymic?: string,
    classId?: number,
    studyYearId?: number,
  ): Promise<Student[]> {
    return this.find({
      where: {
        ...(!isNil(firstName) && { firstName: ILike(firstName) }),
        ...(!isNil(lastName) && { lastName: ILike(lastName) }),
        ...(!isNil(patronymic) && { patronymic: ILike(patronymic) }),
        ...(!isNil(classId) && {
          studyCourses: { studyClass: { id: classId } },
        }),
        ...(!isNil(studyYearId) && {
          studyCourses: { studyYear: { id: studyYearId } },
        }),
      },
      relations: {
        studyCourses: {
          studyClass: true,
          studyYear: true,
        },
      },
    });
  }
}
