import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { StudentCreateBodyDto } from './dtos/student-create.dto';
import { StudentRepository } from './repos/student.repository';
import { Student, StudyCourse } from '../db/entities';
import { StudyCourseService } from '../studyCourse/studyCourse.service';
import { EntityManager } from 'typeorm';
import { StudentSearchDto } from './dtos/student-search.dto';
import { StudentEditDto } from './dtos/student-edit.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    @Inject(forwardRef(() => StudyCourseService))
    private readonly studyCourseService: StudyCourseService,
    private entityManager: EntityManager,
  ) {}

  async getStudent(studentId: number) {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: {
        studyCourses: {
          studyClass: true,
        },
        grades: {
          dateSchedule: true,
        },
        NAs: true,
        user: true,
      },
    });
    if (isNil(student)) throw new NotFoundException('Student not found');
    return student;
  }

  async getStudentByUserId(userId: number) {
    return await this.studentRepository.findOne({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
        studyCourses: {
          studyClass: true,
        },
      },
    });
  }

  async getAllStudents() {
    return await this.studentRepository.find({
      relations: {
        studyCourses: {
          studyClass: true,
          studyYear: true,
        },
      },
    });
  }

  async searchStudents(studentSearchDto: StudentSearchDto) {
    const { firstName, lastName, patronymic, classId, studyYearId } =
      studentSearchDto;
    return await this.studentRepository.searchStudents(
      firstName,
      lastName,
      patronymic,
      classId,
      studyYearId,
    );
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
      firstName: firstName,
      lastName: lastName,
      patronymic,
      studyCourses: studentStudyCourses,
    });
  }

  async editStudent(
    studentId: number,
    studentEditDto: StudentEditDto,
  ): Promise<Student> {
    const student = await this.getStudent(studentId);
    const { studyYearId, studyClassId } = studentEditDto;
    if (!isNil(studyYearId) && !isNil(studyClassId)) {
      const studyCourse =
        await this.studyCourseService.getStudyCourseForStudent(
          studyYearId,
          studyClassId,
        );
      student.studyCourses.push(studyCourse);
    }
    return await this.studentRepository.save({
      ...student,
      ...studentEditDto,
    });
  }

  async deleteStudent(studentId: number) {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: {
        user: true,
      },
    });
    if (isNil(student))
      throw new NotFoundException("This student doesn't exist");
    return await this.entityManager.transaction(
      async (transactionEntityManager) => {
        await transactionEntityManager.remove(student);
        await transactionEntityManager.remove(student.user);
      },
    );
  }
}
