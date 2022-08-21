import { Injectable, NotFoundException } from '@nestjs/common';
import { Grade } from '../db/entities';
import { GradeRepository } from './repository/grade.repository';
import { GradeCreateBodyDto } from './dtos/grade-create.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { DateScheduleRepository } from '../dateSchedule/repository/dateSchedule.repository';

@Injectable()
export class GradeService {
  constructor(
    private readonly gradeRepository: GradeRepository,
    private readonly dateScheduleRepository: DateScheduleRepository,
  ) {}

  async getGrades(): Promise<Grade[]> {
    return await this.gradeRepository.find();
  }

  async getGrade(gradeId: number): Promise<Grade> {
    const grade = await this.gradeRepository.findOne(gradeId, {
      relations: ['dateSchedule', 'student'],
    });
    if (isNil(grade)) throw new NotFoundException('Grade not found');
    return grade;
  }

  async createGrade(gradeCreateDto: GradeCreateBodyDto): Promise<Grade> {
    const { value, date, gradeType, studentId } = gradeCreateDto;
    const dateSchedule =
      await this.dateScheduleRepository.getDateScheduleByDate(date);
    return await this.gradeRepository.save({
      student: { id: studentId },
      value,
      dateSchedule: { date },
      gradeType,
    });
  }

  async removeGrade(gradeId: number): Promise<Grade> {
    const grade = await this.getGrade(gradeId);
    return await this.gradeRepository.remove(grade);
  }
}
