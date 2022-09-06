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
import { ScheduleEditDto } from './dtos/schedule-edit.dto';

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

  async getAllSchedules(): Promise<Schedule[]> {
    return await this.scheduleRepository.find({
      relations: {
        subject: true,
        dateSchedule: true,
        teacher: true,
        studyCourse: true,
      },
    });
  }

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
        const dateSchedules = [] as DateSchedule[];
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
        dateSchedules.push(newDateSchedule);
        const studyCourse = await transactionEntityManager.findOne(
          StudyCourse,
          {
            where: { id: studyCourseId },
            relations: {
              students: true,
            },
          },
        );
        return await transactionEntityManager.save(Schedule, {
          teacher,
          subject,
          studyCourse,
          dateSchedule: dateSchedules,
          lessonNumber,
          weekday,
        });
      },
    );
  }

  async editSchedule(
    scheduleId: number,
    editScheduleDto: ScheduleEditDto,
  ): Promise<Schedule> {
    const { subjectId, weekday, lessonNumber, teacherId } = editScheduleDto;
    const schedule = await this.getSchedule(scheduleId);

    return await this.scheduleRepository.save({
      ...schedule,
      ...editScheduleDto,
      teacher: { id: teacherId ?? schedule.teacher.id },
      subject: { id: subjectId ?? schedule.subject.id },
      weekday: weekday ?? schedule.weekday,
      lessonNumber: lessonNumber ?? schedule.lessonNumber,
    });
  }

  async getSchedule(scheduleId: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
      relations: {
        studyCourse: {
          studyYear: true,
          studyClass: true,
        },
        dateSchedule: true,
        teacher: true,
        subject: true,
      },
    });
    if (isNil(schedule)) throw new NotFoundException('Schedule not found');
    return schedule;
  }

  async deleteSchedule(scheduleId: number): Promise<Schedule> {
    const schedule = await this.getSchedule(scheduleId);
    return this.entityManager.transaction(async (transactionEntityManager) => {
      await transactionEntityManager.remove(
        DateSchedule,
        schedule.dateSchedule,
      );
      return await transactionEntityManager.remove(schedule);
    });
  }
}
