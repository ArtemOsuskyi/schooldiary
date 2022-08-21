import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { StudentCreateBodyDto } from './dtos/student-create-dto';
import { StudentRepository } from './repos/student.repository';
import { Student, StudyCourse } from '../db/entities';
import { StudyCourseService } from '../studyCourse/studyCourse.service';
import { EntityManager } from 'typeorm';
import { StudentSearchByFullNameDto } from './dtos/student-searchByFullName.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    @Inject(forwardRef(() => StudyCourseService))
    private readonly studyCourseService: StudyCourseService,
    private entityManager: EntityManager,
  ) {}

  async getStudent(studentId: number) {
    const student = await this.studentRepository.findOne(
      {
        id: studentId,
      },
      {
        relations: [
          'studyCourses',
          'studyCourses.class',
          'grades',
          'NAs',
          'user',
        ],
      },
    );
    if (isNil(student)) throw new NotFoundException('Student not found');
    return student;
  }

  async getAllStudents() {
    return await this.studentRepository.find({
      relations: ['studyCourses', 'grades', 'NAs'],
    });
  }

  async getStudentsByFullName(studentSearchDto: StudentSearchByFullNameDto) {
    const { firstName, lastName, patronymic } = studentSearchDto;
    return await this.studentRepository.findStudentByFullName(
      firstName,
      lastName,
      patronymic,
    );
  }

  async getStudentsByClass(classId: number) {
    return await this.studentRepository.findStudentsByClass(classId);
  }

  async createStudent(
    createStudentDto: StudentCreateBodyDto,
    userId?: number,
  ): Promise<Student> {
    const { firstName, lastName, patronymic, studyYearId, studyClassId } =
      createStudentDto;
    const studentStudyCourses: StudyCourse[] = [];
    const studyCourse = await this.studyCourseService.getStudyCourseForStudent(
      studyYearId,
      studyClassId,
    );
    if (!studyCourse) throw new NotFoundException('');
    studentStudyCourses.push(studyCourse);
    return this.studentRepository.create({
      user: { id: userId },
      first_name: firstName,
      last_name: lastName,
      patronymic,
      studyCourses: studentStudyCourses,
    });
    // const studyCourse = await this.studyCourseService.getStudyCourseByStudyYear(
    //   studyYearId,
    // );
    // await this.studyCourseService.assignStudyCourseToStudent(
    //   studyCourse.id,
    //   newStudent.id,
    // );
  }

  async deleteStudent(studentId: number) {
    const student = await this.studentRepository.findOne(
      {
        id: studentId,
      },
      {
        relations: ['user'],
      },
    );
    if (isNil(student))
      throw new NotFoundException("This student doesn't exist");
    return await this.entityManager.transaction(
      async (transactionEntityManager) => {
        await transactionEntityManager.remove(student);
        await transactionEntityManager.remove(student.user);
      },
    );
  }

  async saveStudent(student: Student) {
    return await this.studentRepository.save(student);
  }
}
