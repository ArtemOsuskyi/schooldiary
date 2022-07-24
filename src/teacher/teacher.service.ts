import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherCreateDto }              from './dtos/teacher-create-dto';
import { isNil }                         from '@nestjs/common/utils/shared.utils';
import { teacherRepository }             from './repos/teacher.repository';

@Injectable()
export class TeacherService {
  async getTeacher(teacherId: number) {
    return await teacherRepository.findOneBy({
      id: teacherId,
    });
  }

  async getAllTeachers() {
    return await teacherRepository.find();
  }

  async createTeacher(teacherCreateDto: TeacherCreateDto) {
    const { first_name, last_name, patronymic } = teacherCreateDto;
    return teacherRepository.save({
      first_name,
      last_name,
      patronymic,
    });
  }

  async deleteTeacher(teacherId: number) {
    const teacher = await teacherRepository.findOneBy({
      id: teacherId,
    });
    if (isNil(teacher)) throw new NotFoundException('This teacher doesn\'t exist');
    return await teacherRepository.remove(teacher);
  }
}
