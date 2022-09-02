import { Injectable, NotFoundException } from '@nestjs/common';
import { Grade, Student } from '../db/entities';
import { GradeRepository } from './repository/grade.repository';
import { GradeCreateBodyDto } from './dtos/grade-create.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { DateScheduleService } from '../dateSchedule/dateSchedule.service';
import { GradeSearchDto } from './dtos/grade-search.dto';
import { GradeEditDto } from './dtos/grade-edit.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class GradeService {
  constructor(
    private readonly gradeRepository: GradeRepository,
    private readonly dateScheduleService: DateScheduleService,
    private entityManager: EntityManager,
  ) {}

  async getGrades(): Promise<Grade[]> {
    return await this.gradeRepository.find();
  }

  async getGrade(gradeId: number): Promise<Grade> {
    const grade = await this.gradeRepository.findOne({
      where: { id: gradeId },
      relations: {
        dateSchedule: {
          schedule: {
            subject: true,
          },
        },
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

  async editGrade(gradeId: number, gradeEditDto: GradeEditDto): Promise<Grade> {
    return this.entityManager.transaction(async (transactionEntityManager) => {
      const { date, studentId } = gradeEditDto;
      const grade = await this.getGrade(gradeId);
      return await transactionEntityManager.save(Grade, {
        ...grade,
        ...gradeEditDto,
        dateSchedule: !isNil(date)
          ? await this.dateScheduleService.getDateScheduleByDate(date)
          : grade.dateSchedule,
        student: !isNil(studentId)
          ? await transactionEntityManager.findOne(Student, {
              where: { id: studentId },
            })
          : grade.student,
      });
    });
  }

  async removeGrade(gradeId: number): Promise<Grade> {
    const grade = await this.getGrade(gradeId);
    return await this.gradeRepository.remove(grade);
  }
}
