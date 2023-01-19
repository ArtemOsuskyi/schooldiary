import { Repository } from 'typeorm';
import { Grade } from '../../db/entities';
import { GradeType } from '../../db/enums/grade_type.enum';
import { CustomRepository } from '../../db/typeorm_ex.decorator';
import { isNil } from '@nestjs/common/utils/shared.utils';

@CustomRepository(Grade)
export class GradeRepository extends Repository<Grade> {
  async searchGrades(
    value?: number,
    gradeType?: GradeType,
    subjectName?: string,
    studentId?: number,
  ) {
    return await this.find({
      where: {
        ...(!isNil(value) && { value }),
        ...(!isNil(gradeType) && { gradeType }),
        ...(!isNil(studentId) && { student: { id: studentId } }),
        ...(!isNil(subjectName) && {
          dateSchedule: { schedule: { subject: { name: subjectName } } },
        }),
      },
      relations: {
        student: true,
        dateSchedule: {
          schedule: {
            subject: true,
          },
        },
      },
    });
  }

  getAverageGradesQuery(
    classId: number,
    subjectId: number,
    gradeType: GradeType,
    studyYearId: number,
  ) {
    return this.createQueryBuilder('grades')
      .select(['grades.value', 'grades.gradeType'])
      .leftJoin('grades.student', 'student')
      .addSelect([
        'student.firstName',
        'student.lastName',
        'student.patronymic',
      ])
      .leftJoin('student.studyCourses', 'study_course')
      .addSelect(['study_course.class_id', 'study_course.study_year_id'])
      .leftJoin('grades.dateSchedule', 'date_schedule')
      .leftJoin('date_schedule.schedule', 'schedule')
      .leftJoin('schedule.subject', 'subject')
      .leftJoin('study_course.studyClass', 'study_class')
      .addSelect('study_class.name')
      .where(
        `(grades.grade_type = '${gradeType}' AND study_class.id = ${classId} AND study_course.study_year_id = ${studyYearId} AND subject.id = ${subjectId})`,
      );
  }
  async getAverageGradesByClass(
    classId: number,
    subjectId: number,
    gradeType: GradeType,
    studyYearId: number,
  ) {
    const gradesQuery = this.getAverageGradesQuery(
      classId,
      subjectId,
      gradeType,
      studyYearId,
    );
    const grades = await gradesQuery.getMany();
    const [averageGrade] = await this.query(
      `
      SELECT AVG("grades_value") FROM (${gradesQuery.getQuery()}) AS grades
    `,
    );
    return { grades, averageGrade: Math.floor(parseInt(averageGrade.avg)) };
  }
}
