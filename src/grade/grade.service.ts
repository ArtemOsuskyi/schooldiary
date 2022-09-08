import { Injectable, NotFoundException } from '@nestjs/common';
import { Grade, Student, StudyClass, StudyYear, Subject } from '../db/entities';
import { GradeRepository } from './repository/grade.repository';
import { GradeCreateBodyDto } from './dtos/grade-create.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { DateScheduleService } from '../dateSchedule/dateSchedule.service';
import { GradeSearchDto } from './dtos/grade-search.dto';
import { GradeEditDto } from './dtos/grade-edit.dto';
import { EntityManager } from 'typeorm';
import { GradeType } from '../db/enums/grade_type.enum';
import { GradeSearchCurrentStudentDto } from './dtos/grade-searchCurrentStudent.dto';

@Injectable()
export class GradeService {
  constructor(
    private readonly gradeRepository: GradeRepository,
    private readonly dateScheduleService: DateScheduleService,
    private entityManager: EntityManager,
  ) {}

  async getGrades(): Promise<Grade[]> {
    return await this.gradeRepository.find({
      relations: {
        student: {
          studyCourses: {
            studyClass: true,
            studyYear: true,
          },
        },
        dateSchedule: {
          schedule: {
            subject: true,
          },
        },
      },
    });
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
      subjectName,
      studentId,
    );
  }

  async searchGradesForCurrentStudent(
    studentId: number,
    gradeSearchDto: GradeSearchCurrentStudentDto,
  ): Promise<Grade[]> {
    const { value, gradeType, subjectName } = gradeSearchDto;
    return await this.gradeRepository.searchGrades(
      value,
      gradeType,
      subjectName,
      studentId,
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

  async getAverageGradesByClass(
    classId: number,
    subjectId: number,
    gradeType: GradeType,
    studyYearId: number,
  ) {
    return this.entityManager.transaction(async (transactionEntityManager) => {
      const studyClass = await transactionEntityManager.findOne(StudyClass, {
        where: { id: classId },
      });
      const subject = await transactionEntityManager.findOne(Subject, {
        where: { id: subjectId },
      });
      const studyYear = await transactionEntityManager.findOne(StudyYear, {
        where: { id: studyYearId },
      });
      const grades = await this.gradeRepository.find({
        where: {
          student: {
            studyCourses: {
              studyClass,
              studyYear,
            },
          },
          dateSchedule: {
            schedule: {
              subject,
            },
          },
        },
        relations: {
          student: {
            studyCourses: {
              studyClass: true,
              studyYear: true,
            },
          },
          dateSchedule: {
            schedule: {
              subject: true,
            },
          },
        },
        select: {
          value: true,
          gradeType: true,
          student: {
            firstName: true,
            lastName: true,
            patronymic: true,
            studyCourses: {
              studyClass: {
                name: true,
              },
            },
          },
        },
      });
      const averageGrade =
        grades
          .map((grade) => grade.value)
          .reduce((acc, currentValue) => {
            acc = acc + currentValue;
            return acc;
          }, 0) / grades.length;
      return { grades, averageGrade };
    });
  }

  async removeGrade(gradeId: number): Promise<Grade> {
    const grade = await this.getGrade(gradeId);
    return await this.gradeRepository.remove(grade);
  }
}
