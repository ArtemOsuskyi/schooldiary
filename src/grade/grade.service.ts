import { Injectable, NotFoundException } from '@nestjs/common';
import { Grade } from '../db/entities';
import { GradeRepository } from './repository/grade.repository';
import { GradeCreateBodyDto } from './dtos/grade-create.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { DateScheduleService } from '../dateSchedule/dateSchedule.service';
import { GradeSearchDto } from './dtos/grade-search.dto';

@Injectable()
export class GradeService {
  constructor(
    private readonly gradeRepository: GradeRepository,
    private readonly dateScheduleService: DateScheduleService,
  ) {}

  async getGrades(): Promise<Grade[]> {
    return await this.gradeRepository.find();
  }

  async getGrade(gradeId: number): Promise<Grade> {
    const grade = await this.gradeRepository.findOne({
      where: { id: gradeId },
      relations: {
        dateSchedule: true,
        student: true,
      },
    });
    if (isNil(grade)) throw new NotFoundException('Grade not found');
    return grade;
  }

  async searchGrades(gradeSearchDto: GradeSearchDto): Promise<Grade[]> {
    const { value, gradeType, studentId, subjectName } = gradeSearchDto;
    return this.gradeRepository.searchGrades(
      value,
      gradeType,
      studentId,
      subjectName,
    );
  }

  async createGrade(gradeCreateDto: GradeCreateBodyDto): Promise<Grade> {
    const { studentId, value, dateScheduleId, gradeType } = gradeCreateDto;
    const dateSchedule = await this.dateScheduleService.getDateSchedule(
      dateScheduleId,
    );
    return await this.gradeRepository.save({
      student: { id: studentId },
      value,
      dateSchedule,
      gradeType,
    });
  }

  async removeGrade(gradeId: number): Promise<Grade> {
    const grade = await this.getGrade(gradeId);
    return await this.gradeRepository.remove(grade);
  }
}
