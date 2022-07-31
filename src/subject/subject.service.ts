import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '../db/entities';
import { SubjectRepository } from './repository/subject.repository';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: SubjectRepository,
  ) {}

  async getSubject(subjectId: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne(subjectId);
    if (isNil(subject)) throw new NotFoundException();
    return subject;
  }

  async createSubject(name: string): Promise<Subject> {
    return await this.subjectRepository.save({
      name,
    });
  }

  async deleteSubject(subjectId: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne(subjectId);
    return await this.subjectRepository.remove(subject);
  }
}
