import { Injectable, NotFoundException } from '@nestjs/common';
import { Homework } from '../db/entities';
import { HomeworkCreateBodyDto } from './dto/homework-create.dto';
import { HomeworkRepository } from './repository/homework.repository';
import { DateScheduleService } from '../dateSchedule/dateSchedule.service';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class HomeworkService {
  constructor(
    private readonly homeworkRepository: HomeworkRepository,
    private readonly dateScheduleService: DateScheduleService,
  ) {}

  async createHomework(
    createHomeworkDto: HomeworkCreateBodyDto,
  ): Promise<Homework> {
    const { description, deadline, dateScheduleId } = createHomeworkDto;
    const dateSchedule = await this.dateScheduleService.getDateSchedule(
      dateScheduleId,
    );
    return this.homeworkRepository.save({
      description,
      deadline,
      dateSchedule,
    });
  }

  async getHomework(homeworkId: number): Promise<Homework> {
    const homework = this.homeworkRepository.findOne({
      where: { id: homeworkId },
    });
    if (isNil(homework)) throw new NotFoundException('Homework not found');
    return homework;
  }

  async deleteHomework(homeworkId: number): Promise<Homework> {
    const homework = await this.getHomework(homeworkId);
    return await this.homeworkRepository.remove(homework);
  }
}
