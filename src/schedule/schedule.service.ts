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
import { Schedule } from '../db/entities';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class ScheduleService {
  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    @Inject(forwardRef(() => DateScheduleService))
    private readonly dateScheduleService: DateScheduleService,
    private readonly studyCourseService: StudyCourseService,
  ) {}

  async createSchedule(scheduleCreateDto: ScheduleCreateBodyDto) {
    const { dateScheduleId, studyCourseId, weekday, lessonNumber } =
      scheduleCreateDto;
    const dateSchedule = await this.dateScheduleService.getDataSchedule(
      dateScheduleId,
    );
    const studyCourse = await this.studyCourseService.getStudyCourseById(
      studyCourseId,
    );
    return await this.scheduleRepository.save({
      date_schedule: dateSchedule,
      study_course: studyCourse,
      weekday,
      lesson_number: lessonNumber,
    });
  }

  async getSchedule(scheduleId: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne(scheduleId, {
      relations: ['studyCourse'],
    });
    if (isNil(schedule)) throw new NotFoundException('Schedule not found');
    return schedule;
  }
}
