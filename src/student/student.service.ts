import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StudentCreateBodyDto } from './dtos/student-create-dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { StudentRepository } from './repos/student.repository';
import { Student } from '../db/entities';
import { StudyCourseService } from '../studyCourse/study_course.service';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    @Inject(forwardRef(() => StudyCourseService))
    private readonly studyCourseService: StudyCourseService,
  ) {}

  async getStudent(studentId: number) {
    const student = await this.studentRepository.findOne(
      {
        id: studentId,
      },
      {
        relations: ['studyCourses', 'grades', 'NAs', 'user'],
      },
    );
    console.log(student);
    if (isNil(student)) throw new NotFoundException();
    return student;
  }

  async getStudentByUserId(userId: number): Promise<Student> {
    return await this.studentRepository.getStudentByUserId(userId);
  }

  async getAllStudents() {
    return await this.studentRepository.find({
      relations: ['studyCourses', 'grades', 'NAs'],
    });
  }

  async createStudent(
    createStudentDto: StudentCreateBodyDto,
  ): Promise<Student> {
    const { firstName, lastName, patronymic } = createStudentDto;
    return this.studentRepository.create({
      first_name: firstName,
      last_name: lastName,
      patronymic,
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
    const student = await this.studentRepository.findOne({
      id: studentId,
    });
    if (isNil(student))
      throw new NotFoundException("This student doesn't exist");
    return await this.studentRepository.remove(student);
  }

  async saveStudent(student: Student) {
    return await this.studentRepository.save(student);
  }
}
