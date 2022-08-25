import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StudyYear } from '../db/entities';
import { StudyYearRepository } from './repository/studyYear.repository';
import { StudyYearCreateBodyDto } from './dtos/studyYear-create.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class StudyYearService {
  constructor(private readonly studyYearRepository: StudyYearRepository) {}

  async getAllStudyYear(): Promise<StudyYear[]> {
    return await this.studyYearRepository.find();
  }

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

  async deleteStudyYear(studyYearId: number): Promise<StudyYear> {
    const studyYear = await this.studyYearRepository.findOne(studyYearId);
    if (isNil(studyYear))
      throw new NotFoundException("This study year doesn't exist");
    return await this.studyYearRepository.remove(studyYear);
  }
}
