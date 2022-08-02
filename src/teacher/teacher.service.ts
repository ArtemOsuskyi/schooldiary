import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherCreateBodyDto } from './dtos/teacher-create-dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { TeacherRepository } from './repos/teacher.repository';
import { Teacher } from '../db/entities';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepository) {}
  async getTeacher(teacherId: number) {
    const teacher = await this.teacherRepository.findOne(
      {
        id: teacherId,
      },
      {
        relations: ['teacher_subjects'],
      },
    );
    if (isNil(teacher)) throw new NotFoundException();
    return teacher;
  }

  async getTeacherByUserId(userId: number): Promise<Teacher> {
    return await this.teacherRepository.getTeacherByUserId(userId);
  }

  async getAllTeachers() {
    return await this.teacherRepository.find();
  }

  async createTeacher(teacherCreateDto: TeacherCreateBodyDto) {
    const { firstName, lastName, patronymic } = teacherCreateDto;
    return this.teacherRepository.create({
      first_name: firstName,
      last_name: lastName,
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

  async saveTeacher(teacher: Teacher) {
    return await this.teacherRepository.save(teacher);
  }
}
