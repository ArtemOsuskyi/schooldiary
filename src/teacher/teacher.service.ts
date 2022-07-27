import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherCreateDto } from './dtos/teacher-create-dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { TeacherRepository } from './repos/teacher.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../db/entities';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: TeacherRepository,
  ) {}
  async getTeacher(teacherId: number) {
    return await this.teacherRepository.findOne({
      id: teacherId,
    });
  }

  async getAllTeachers() {
    return await this.teacherRepository.find();
  }

  async createTeacher(teacherCreateDto: TeacherCreateDto) {
    const { first_name, last_name, patronymic } = teacherCreateDto;
    return this.teacherRepository.save({
      first_name,
      last_name,
      patronymic,
    });
  }

  async deleteTeacher(teacherId: number) {
    const teacher = await this.teacherRepository.findOne({
      id: teacherId,
    });
    if (isNil(teacher))
      throw new NotFoundException("This teacher doesn't exist");
    return await this.teacherRepository.remove(teacher);
  }
}
