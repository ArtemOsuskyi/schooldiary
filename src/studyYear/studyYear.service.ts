import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyYear } from '../db/entities';
import { StudyYearRepository } from './repository/studyYear.repository';
import { StudyYearCreateBodyDto } from './dtos/studyYear-create.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class StudyYearService {
  constructor(
    @InjectRepository(StudyYear)
    private readonly studyYearRepository: StudyYearRepository,
  ) {}

  async createStudyYear(
    studyYearCreateDto: StudyYearCreateBodyDto,
  ): Promise<StudyYear> {
    const { start_date, end_date } = studyYearCreateDto;
    if (start_date > end_date)
      throw new BadRequestException(
        'Start date cannot be greater than end date',
      );
    return await this.studyYearRepository.save({
      start_date,
      end_date,
    });
  }

  async getStudyYear(studyYearId: number): Promise<StudyYear> {
    const studyYear = await this.studyYearRepository.findOne(studyYearId, {
      relations: ['studyCourses', 'studyCourses.class'],
    });
    if (isNil(studyYear)) throw new NotFoundException();
    return studyYear;
  }

  async deleteStudyYear(id: number): Promise<StudyYear> {
    const studyYear = await this.studyYearRepository.findOne(id);
    if (isNil(studyYear))
      throw new NotFoundException("This study year doesn't exist");
    return await this.studyYearRepository.remove(studyYear);
  }
}
