import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ScheduleRepository } from './repository/schedule.repository';
import { ScheduleCreateBodyDto } from './dtos/schedule-create.dto';
import { DateScheduleService } from '../dateSchedule/dateSchedule.service';
import { StudyCourseService } from '../studyCourse/studyCourse.service';
import { DateSchedule, Schedule, StudyCourse } from '../db/entities';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { EntityManager } from 'typeorm';
import { TeacherService } from '../teacher/teacher.service';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    @Inject(forwardRef(() => DateScheduleService))
    private readonly dateScheduleService: DateScheduleService,
    private readonly studyCourseService: StudyCourseService,
    private readonly teacherService: TeacherService,
    private readonly subjectService: SubjectService,
    private entityManager: EntityManager,
  ) {}

  async createSchedule(scheduleCreateDto: ScheduleCreateBodyDto) {
    const {
      teacherId,
      subjectName,
      date,
      studyCourseId,
      weekday,
      lessonNumber,
    } = scheduleCreateDto;
    return await this.entityManager.transaction(
      async (transactionEntityManager) => {
        const teacher = await this.teacherService.getTeacher(teacherId);
        const subject = await this.subjectService.getSubjectByName(subjectName);
        const existingDateSchedule =
          await this.dateScheduleService.getDateScheduleByDate(date);
        const newDateSchedule = await transactionEntityManager.save(
          DateSchedule,
          isNil(existingDateSchedule)
            ? transactionEntityManager.create(DateSchedule, {
                date,
              })
            : existingDateSchedule,
        );
        const studyCourse = await transactionEntityManager.findOne(
          StudyCourse,
          {
            where: { id: studyCourseId },
            relations: {
              students: true,
            },
          },
        );
        const schedule = transactionEntityManager.create(Schedule, {
          teacher,
          subject,
          studyCourse,
          dateSchedule: [],
          lessonNumber,
          weekday,
        });
        schedule.dateSchedule.push(newDateSchedule);
        return await transactionEntityManager.save(Schedule, {
          ...schedule,
        });
      },
    );
  }

  async getSchedule(scheduleId: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
      relations: {
        studyCourse: true,
        dateSchedule: true,
        teacher: true,
        subject: true,
      },
    });
    if (isNil(schedule)) throw new NotFoundException('Schedule not found');
    return schedule;
  }

  async getScheduleByClassAndDate(classId: number, date: Date) {
    return await this.scheduleRepository.find({
      where: {
        studyCourse: {
          studyClass: { id: classId },
        },
        dateSchedule: { date },
      },
      relations: {
        studyCourse: true,
        dateSchedule: true,
      },
    });
  }

  async deleteSchedule(scheduleId: number): Promise<Schedule> {
    const schedule = await this.getSchedule(scheduleId);
    return await this.scheduleRepository.remove(schedule);
  }
}
