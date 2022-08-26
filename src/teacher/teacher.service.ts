import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherCreateBodyDto } from './dtos/teacher-create-dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { TeacherRepository } from './repos/teacher.repository';
import { Subject, Teacher } from '../db/entities';
import { EntityManager } from 'typeorm';
import { TeacherSearchDto } from './dtos/teacher-search.dto';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly subjectService: SubjectService,
    private entityManager: EntityManager,
  ) {}

  async getTeacher(teacherId: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: {
        subjects: true,
      },
    });
    if (isNil(teacher)) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async getTeacherByUserId(userId: number): Promise<Teacher> {
    return await this.teacherRepository.getTeacherByUserId(userId);
  }

  async searchTeacherByFilters(
    teacherSearchDto: TeacherSearchDto,
  ): Promise<Teacher[]> {
    const { firstName, lastName, patronymic, subjects } = teacherSearchDto;
    // const subjects = await this.subjectService.getTeacherBySubjects(teacherSearchDto.subjects)
    return await this.teacherRepository.searchTeacherByFilters(
      firstName,
      lastName,
      patronymic,
      subjects,
    );
  }

  async getAllTeachers() {
    return await this.teacherRepository.find({
      relations: {
        subjects: true,
      },
    });
  }

  async createTeacher(teacherCreateDto: TeacherCreateBodyDto, userId?: number) {
    const { firstName, lastName, patronymic } = teacherCreateDto;
    return this.entityManager.transaction(async (transactionEntityManager) => {
      return transactionEntityManager.create(Teacher, {
        user: { id: userId },
        firstName: firstName,
        lastName: lastName,
        patronymic,
      });
    });
  }

  async deleteTeacher(teacherId: number) {
    const teacher: Teacher = await this.teacherRepository.findOne({
      where: {
        id: teacherId,
      },
      relations: {
        user: true,
      },
    });
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
