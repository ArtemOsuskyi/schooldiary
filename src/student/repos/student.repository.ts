import { ILike, Repository } from 'typeorm';
import { Student } from '../../db/entities';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { CustomRepository } from '../../db/typeorm_ex.decorator';

@CustomRepository(Student)
export class StudentRepository extends Repository<Student> {
  async findStudentByFullName(
    firstName?: string,
    lastName?: string,
    patronymic?: string,
  ): Promise<Student[]> {
    return this.find({
      where: {
        ...(!isNil(firstName) && { firstName: ILike(firstName) }),
        ...(!isNil(lastName) && { lastName: ILike(lastName) }),
        ...(!isNil(patronymic) && { patronymic: ILike(patronymic) }),
      },
    });
  }

  async findStudentsByClass(classId: number): Promise<Student[]> {
    return await this.createQueryBuilder('student')
      .leftJoinAndSelect('student.studyCourses', 'studyCourse')
      .where(`studyCourse.class.id = ${classId}`)
      .leftJoinAndSelect('studyCourse.class', 'class')
      .leftJoinAndSelect('studyCourse.studyYear', 'studyYear')
      .getMany();
  }

  async findStudentsByStudyYear(studyYearId: number): Promise<Student[]> {
    console.log(studyYearId);
    return await this.createQueryBuilder('student')
      .leftJoinAndSelect('student.studyCourses', 'studyCourse')
      .leftJoinAndSelect('studyCourse.studyYear', 'studyYear')
      .where(`studyYear.id = ${studyYearId}`)
      .leftJoinAndSelect('studyCourse.class', 'class')
      .getMany();
  }
}
