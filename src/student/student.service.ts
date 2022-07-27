import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StudentCreateDto } from './dtos/student-create-dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { StudentRepository } from './repos/student.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../db/entities';
import { StudyCourseService } from '../study_course/study_course.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: StudentRepository,
    @Inject(forwardRef(() => StudyCourseService))
    private readonly studyCourseService: StudyCourseService,
  ) {}

  async getStudent(studentId: number) {
    const student = await this.studentRepository.findOne({
      id: studentId,
    });
    if (isNil(student)) throw new NotFoundException();
    return student;
  }

  async getAllStudents() {
    return await this.studentRepository.find();
  }

  async createStudent(
    createStudentDto: StudentCreateDto,
    studyCourseId: number,
  ): Promise<Student> {
    const { first_name, last_name, patronymic } = createStudentDto;
    const newStudent = await this.studentRepository.save({
      first_name,
      last_name,
      patronymic,
    });
    await this.studyCourseService.assignStudyCourseToStudent(
      studyCourseId,
      newStudent.id,
    );
    return newStudent;
  }

  async deleteStudent(studentId: number) {
    const student = await this.studentRepository.findOne({
      id: studentId,
    });
    if (isNil(student))
      throw new NotFoundException("This student doesn't exist");
    return await this.studentRepository.remove(student);
  }
}
