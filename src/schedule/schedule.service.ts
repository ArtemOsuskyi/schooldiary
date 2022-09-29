import {
  BadRequestException,
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
import { Any, EntityManager, In } from 'typeorm';
import { TeacherService } from '../teacher/teacher.service';
import { SubjectService } from '../subject/subject.service';
import { ScheduleEditDto } from './dtos/schedule-edit.dto';
import { ScheduleSearchDto } from './dtos/schedule-search.dto';

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
        studyCourse: {
          studyClass: true,
        },
      },
      order: {
        weekday: 'ASC',
        lessonNumber: 'ASC',
      },
    });
  }

  async createSchedule(scheduleCreateDto: ScheduleCreateBodyDto) {
    const { studyCourseId, teacherId, subjectName, lessonNumber, weekday } =
      scheduleCreateDto;
    return await this.entityManager.transaction(
      async (transactionEntityManager) => {
        const teacher = await this.teacherService.getTeacher(teacherId);
        const subject = await this.subjectService.getSubjectByName(subjectName);
        if (
          !teacher.subjects.find(
            (teacherSubject) => teacherSubject.name === subject.name,
          )
        ) {
          throw new BadRequestException(
            "This teacher doesn't teach this subject",
          );
        }
        const studyCourse = await transactionEntityManager.findOne(
          StudyCourse,
          {
            where: {
              id: studyCourseId,
            },
            relations: { students: true, studyClass: true },
          },
        );
        if (isNil(studyCourse))
          throw new NotFoundException('Study course not found');
        return await transactionEntityManager.save(Schedule, {
          teacher,
          subject,
          studyCourse,
          lessonNumber,
          weekday,
        });
      },
    );
  }

  async getScheduleForCurrentStudent(
      studentId: number,
    studyCourseId: number,
  ) {
    const studyCourse = await this.studyCourseService.getStudyCourseById(
      studyCourseId,
    );
    return this.scheduleRepository.find({
      where: {
        studyCourse: {
          students: {id: studentId},
          id: studyCourse.id,
        },
      },
      order: {
        weekday: 'ASC',
        lessonNumber: 'ASC',
      },
      relations: {
        subject: true,
        dateSchedule: true,
        teacher: true,
        studyCourse: {
          studyClass: true
        }
      },
    });
  }

  async editSchedule(
    scheduleId: number,
    editScheduleDto: ScheduleEditDto,
  ): Promise<Schedule> {
    const { subjectId, weekday, lessonNumber, teacherId } = editScheduleDto;
    const schedule = await this.getSchedule(scheduleId);
    const teacher = await this.teacherService.getTeacher(teacherId);
    const subject = await this.subjectService.getSubject(subjectId);

    return await this.scheduleRepository.save({
      ...schedule,
      teacher: teacher ?? schedule.teacher,
      subject: subject ?? schedule.subject,
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
        dateSchedule: {
          homework: true,
        },
        teacher: true,
        subject: true,
      },
    });
    if (isNil(schedule)) throw new NotFoundException('Schedule not found');
    return schedule;
  }

  async searchSchedule(
    scheduleSearchDto: ScheduleSearchDto,
  ): Promise<Schedule[]> {
    const { className, dateScheduleId, teacherId, studyCourseId } =
      scheduleSearchDto;
    return await this.scheduleRepository.searchSchedule(
      className,
      dateScheduleId,
      teacherId,
      studyCourseId,
    );
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
