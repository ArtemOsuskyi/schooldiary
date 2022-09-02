import { Repository } from 'typeorm';
import { Homework } from '../../db/entities';
import { CustomRepository } from '../../db/typeorm_ex.decorator';
import { HomeworkSearchDto } from '../dto/homework-search.dto';
import { isNil } from '@nestjs/common/utils/shared.utils';

@CustomRepository(Homework)
export class HomeworkRepository extends Repository<Homework> {
  async searchHomework(
    searchHomeworkDto: HomeworkSearchDto,
  ): Promise<Homework[]> {
    const {
      description,
      deadline,
      dateScheduleId,
      studyClassId,
      teacherId,
      subjectId,
    } = searchHomeworkDto;
    return this.find({
      where: {
        ...(!isNil(description) && { description }),
        ...(!isNil(deadline) && { deadline }),
        ...(!isNil(dateScheduleId) && { dateSchedule: { id: dateScheduleId } }),
        ...(!isNil(studyClassId) && {
          dateSchedule: {
            schedule: { studyCourse: { studyClass: { id: studyClassId } } },
          },
        }),
        ...(!isNil(studyClassId) && {
          dateSchedule: {
            schedule: { teacher: { id: teacherId } },
          },
        }),
        ...(!isNil(subjectId) && {
          dateSchedule: {
            schedule: { subject: { id: subjectId } },
          },
        }),
      },
      relations: {
        dateSchedule: {
          schedule: {
            teacher: true,
            subject: true,
          },
        },
      },
    });
  }
}
