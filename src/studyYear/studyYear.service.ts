import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StudyYear } from '../db/entities';
import { StudyYearRepository } from './repository/studyYear.repository';
import { StudyYearCreateBodyDto } from './dtos/studyYear-create.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { StudyYearEditDto } from './dtos/studyYear-edit.dto';

@Injectable()
export class StudyYearService {
  constructor(private readonly studyYearRepository: StudyYearRepository) {}

  async getAllStudyYear(): Promise<StudyYear[]> {
    return await this.studyYearRepository.find();
  }

  async createStudyYear(
    studyYearCreateDto: StudyYearCreateBodyDto,
  ): Promise<StudyYear> {
    const { startDate, endDate } = studyYearCreateDto;
    if (startDate > endDate)
      throw new BadRequestException(
        'Start date cannot be greater than end date',
      );
    return await this.studyYearRepository.save({
      startDate,
      endDate,
    });
  }

  async editStudyYear(
    studyYearId: number,
    studyYearEditDto: StudyYearEditDto,
  ): Promise<StudyYear> {
    const studyYear = await this.getStudyYear(studyYearId);
    const { startDate, endDate } = studyYearEditDto;
    if (startDate > endDate)
      throw new BadRequestException(
        'Start date cannot be greater than end date',
      );
    return this.studyYearRepository.save({
      ...studyYear,
      ...studyYearEditDto,
    });
  }

  async getStudyYear(studyYearId: number): Promise<StudyYear> {
    const studyYear = await this.studyYearRepository.findOne({
      where: { id: studyYearId },
      relations: {
        studyCourses: {
          studyClass: true,
        },
      },
    });
    if (isNil(studyYear)) throw new NotFoundException();
    return studyYear;
  }

  async deleteStudyYear(studyYearId: number): Promise<StudyYear> {
    const studyYear = await this.studyYearRepository.findOne({
      where: { id: studyYearId },
    });
    if (isNil(studyYear))
      throw new NotFoundException("This study year doesn't exist");
    return await this.studyYearRepository.remove(studyYear);
  }
}
