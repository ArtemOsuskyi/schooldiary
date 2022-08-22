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

@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    @Inject(forwardRef(() => DateScheduleService))
    private readonly dateScheduleService: DateScheduleService,
    private readonly studyCourseService: StudyCourseService,
    private entityManager: EntityManager,
  ) {}

  async createSchedule(scheduleCreateDto: ScheduleCreateBodyDto) {
    const { date, studyCourseId, weekday, lessonNumber } = scheduleCreateDto;
    return await this.entityManager.transaction(
      async (transactionEntityManager) => {
        const dateSchedule = await transactionEntityManager.save(
          DateSchedule,
          await this.dateScheduleService.getDateScheduleByDate(date),
        );
        const studyCourse = await transactionEntityManager.findOne(
          StudyCourse,
          await this.studyCourseService.getStudyCourseById(studyCourseId),
        );
        return await transactionEntityManager.save(Schedule, {
          studyCourse,
          lessonNumber,
          weekday,
          date_schedule: dateSchedule,
        });
      },
    );
  }

  async getSchedule(scheduleId: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne(scheduleId, {
      relations: ['studyCourse'],
    });
    if (isNil(schedule)) throw new NotFoundException('Schedule not found');
    return schedule;
  }
}
