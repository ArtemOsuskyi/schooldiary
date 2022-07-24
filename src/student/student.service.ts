import { Injectable, NotFoundException } from '@nestjs/common';
import { studentRepository }             from './repos/student.repository';
import { StudentCreateDto }              from './dtos/student-create-dto';
import { isNil }                         from '@nestjs/common/utils/shared.utils';

@Injectable()
export class StudentService {

  async getStudent(studentId: number) {
    return await studentRepository.findOneBy({
      id: studentId,
    });
  }

  async getAllStudents() {
    return await studentRepository.find();
  }

  async createStudent(createStudentDto: StudentCreateDto) {
    const { first_name, last_name, patronymic } = createStudentDto;
    return studentRepository.save({
      first_name,
      last_name,
      patronymic,
    });
  }

  async deleteStudent(studentId: number) {
    const student = await studentRepository.findOneBy({
      id: studentId,
    });
    if (isNil(student)) throw new NotFoundException('This student doesn\'t exist');
    return await studentRepository.remove(student);
  }
}
