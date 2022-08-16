import { Injectable, NotFoundException } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { StudyClass } from '../db/entities';
import { StudyClassRepository } from './repository/study_class.repository';
import { StudyClassCreateDto } from './dtos/studyClass-create.dto';

@Injectable()
export class StudyClassService {
  constructor(private readonly classRepository: StudyClassRepository) {}

  async createClass(
    studyClassCreateDto: StudyClassCreateDto,
  ): Promise<StudyClass> {
    return await this.classRepository.save({
      name: studyClassCreateDto.name,
    });
  }

  async getClassById(classId: number): Promise<StudyClass> {
    const studyClass = await this.classRepository.findOne(classId, {
      relations: ['studyCourses', 'studyCourses.students'],
    });
    if (isNil(studyClass)) throw new NotFoundException('Class not found');
    return studyClass;
  }

  async removeClass(classId: number): Promise<StudyClass> {
    const studyClass = await this.classRepository.findOne(classId);
    if (!studyClass) throw new NotFoundException("This class doesn't exist");
    return await this.classRepository.remove(studyClass);
  }
}
