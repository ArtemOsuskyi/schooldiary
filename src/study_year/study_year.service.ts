import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }              from '@nestjs/typeorm';
import { StudyYear }           from '../db/entities';
import { StudyYearRepository } from './repository/study_year.repository';
import { StudyYearCreateDto }  from './dtos/study_year-create.dto';
import { isNil }               from '@nestjs/common/utils/shared.utils';

@Injectable()
export class StudyYearService {
  constructor(
    @InjectRepository(StudyYear)
    private readonly studyYearRepository: StudyYearRepository
  ) {}

  async createStudyYear(studyYearCreateDto: StudyYearCreateDto): Promise<StudyYear> {
    const { start_date, end_date } = studyYearCreateDto
    return await this.studyYearRepository.save({
      start_date,
      end_date
    })
  }
    async deleteStudyYear(id: number): Promise<StudyYear>{
      const studyYear = await this.studyYearRepository.findOne(id)
      if (isNil(studyYear)) throw new NotFoundException("This study year doesn't exist")
      return await this.studyYearRepository.remove(studyYear)
    }
}
