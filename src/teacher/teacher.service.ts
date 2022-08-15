import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherCreateBodyDto } from './dtos/teacher-create-dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { TeacherRepository } from './repos/teacher.repository';
import { Teacher } from '../db/entities';
import { EntityManager } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private entityManager: EntityManager,
  ) {}
  async getTeacher(teacherId: number) {
    const teacher = await this.teacherRepository.findOne(
      {
        id: teacherId,
      },
      {
        relations: ['teacher_subjects', 'teacher_subjects.subject'],
      },
    );
    if (isNil(teacher)) throw new NotFoundException();
    return teacher;
  }

  async getTeacherByUserId(userId: number): Promise<Teacher> {
    return await this.teacherRepository.getTeacherByUserId(userId);
  }

  async getAllTeachers() {
    return await this.teacherRepository.find({
      relations: ['teacher_subjects', 'teacher_subjects.subject'],
    });
  }

  async createTeacher(teacherCreateDto: TeacherCreateBodyDto, userId?: number) {
    const { firstName, lastName, patronymic } = teacherCreateDto;
    return this.teacherRepository.create({
      user: { id: userId },
      first_name: firstName,
      last_name: lastName,
      patronymic,
    });
  }

  async deleteTeacher(teacherId: number) {
    const teacher: Teacher = await this.teacherRepository.findOne(
      {
        id: teacherId,
      },
      {
        relations: ['user'],
      },
    );
    if (isNil(teacher))
      throw new NotFoundException("This teacher doesn't exist");
    console.log(teacher, teacher.user);
    return await this.entityManager.transaction(
      async (transactionEntityManager) => {
        await transactionEntityManager.remove(teacher);
        await transactionEntityManager.remove(teacher.user);
      },
    );
  }

  async saveTeacher(teacher: Teacher) {
    return await this.teacherRepository.save(teacher);
  }
}
