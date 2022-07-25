import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentCreateDto }              from './dtos/student-create-dto';
import { isNil }                         from '@nestjs/common/utils/shared.utils';
import { StudentRepository }             from './repos/student.repository';
import { InjectRepository }              from '@nestjs/typeorm';
import { Student }                       from '../db/entities';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: StudentRepository
  ) {
  }
  async getStudent(studentId: number) {
    return await this.studentRepository.findOne({
      id: studentId,
    });
  }

  async getAllStudents() {
    return await this.studentRepository.find();
  }

  async createStudent(createStudentDto: StudentCreateDto) {
    const { first_name, last_name, patronymic } = createStudentDto;
    return this.studentRepository.save({
      first_name,
      last_name,
      patronymic,
    });
  }

  async deleteStudent(studentId: number) {
    const student = await this.studentRepository.findOne({
      id: studentId,
    });
    if (isNil(student)) throw new NotFoundException('This student doesn\'t exist');
    return await this.studentRepository.remove(student);
  }
}
