import { Injectable, NotFoundException } from '@nestjs/common';
import { Subject } from '../db/entities';
import { SubjectRepository } from './repository/subject.repository';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { TeacherService } from '../teacher/teacher.service';

@Injectable()
export class SubjectService {
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly teacherService: TeacherService,
  ) {}

  async createSubject(name: string, teacherId: number): Promise<Subject> {
    const result = await this.subjectRepository.create({
      name,
      teachers: [{ id: teacherId }],
    });
    console.log(result);
    return result;
  }

  async getSubject(subjectId: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne(subjectId, {
      relations: ['teachers'],
    });
    if (isNil(subject)) throw new NotFoundException('Subject not found');
    return subject;
  }

  async getSubjectByName(name: string): Promise<Subject> {
    return this.subjectRepository.getSubjectByName(name);
  }

  async deleteSubject(subjectId: number): Promise<Subject> {
    const subject = await this.getSubject(subjectId);
    return await this.subjectRepository.remove(subject);
  }

  // async assignSubjectToTeacher(subjectId: number, teacherId: number) {
  //   const subject = await this.getSubject(subjectId);
  //   return await this.subjectRepository.update(subject, {
  //     ...subject,
  //     teachers: [{ id: teacherId }],
  //   });
  // }
}
