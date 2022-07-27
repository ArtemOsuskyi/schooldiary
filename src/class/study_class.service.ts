import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyClass } from '../db/entities';
import { StudyClassRepository } from './repository/study_class.repository';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class StudyClassService {
  constructor(
    @InjectRepository(StudyClass)
    private readonly classRepository: StudyClassRepository,
  ) {}

  async createClass(name: string): Promise<StudyClass> {
    return await this.classRepository.save({
      name,
    });
  }

  async getClass(classId: number): Promise<StudyClass> {
    const studyClass = await this.classRepository.findOne(classId);
    if (isNil(studyClass)) throw new NotFoundException();
    return studyClass;
  }

  async deleteClass(name: string): Promise<StudyClass> {
    const studyClass = await this.classRepository.findOne({ name });
    if (!studyClass) throw new NotFoundException("This class doesn't exist");
    return await this.classRepository.remove(studyClass);
  }
}
