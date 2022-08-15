import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyClass } from '../db/entities';
import { StudyClassRepository } from './repository/study_class.repository';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { StudyClassCreateDto } from './dtos/studyClass-create.dto';

@Injectable()
export class StudyClassService {
  constructor(
    @InjectRepository(StudyClass)
    private readonly classRepository: StudyClassRepository,
  ) {}

  async createClass(
    studyClassCreateDto: StudyClassCreateDto,
  ): Promise<StudyClass> {
    return await this.classRepository.save({
      name: studyClassCreateDto.name,
    });
  }

  async getClass(classId: number): Promise<StudyClass> {
    const studyClass = await this.classRepository.findOne(classId);
    if (isNil(studyClass)) throw new NotFoundException();
    return studyClass;
  }

  async removeClass(classId: number): Promise<StudyClass> {
    const studyClass = await this.classRepository.findOne(classId);
    if (!studyClass) throw new NotFoundException("This class doesn't exist");
    return await this.classRepository.remove(studyClass);
  }
}
