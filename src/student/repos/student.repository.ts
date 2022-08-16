import { EntityRepository, ILike, Repository } from 'typeorm';
import { Student } from '../../db/entities';
import { isNil } from '@nestjs/common/utils/shared.utils';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async findStudentByFullName(
    firstName?: string,
    lastName?: string,
    patronymic?: string,
  ): Promise<Student[]> {
    return this.find({
      where: {
        ...(!isNil(firstName) && { first_name: ILike(firstName) }),
        ...(!isNil(lastName) && { last_name: ILike(lastName) }),
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
}
