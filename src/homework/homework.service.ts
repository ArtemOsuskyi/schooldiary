import { Injectable } from '@nestjs/common';
import { Homework } from '../db/entities';
import { HomeworkCreateBodyDto } from './dto/homework-create.dto';
import { HomeworkRepository } from './repository/homework.repository';
import { DateScheduleService } from '../dateSchedule/dateSchedule.service';

@Injectable()
export class HomeworkService {
  constructor(
    private readonly homeworkRepository: HomeworkRepository,
    private readonly dateScheduleService: DateScheduleService,
  ) {}

  async createHomework(
    createHomeworkDto: HomeworkCreateBodyDto,
  ): Promise<Homework> {
    const { description, deadline } = createHomeworkDto;
    return this.homeworkRepository.create({
      description,
      deadline,
    });
  }

  async getHomework(homeworkId: number): Promise<Homework> {
    return this.homeworkRepository.findOne(homeworkId);
  }

  // async assignDateScheduleToHomework(
  //   createHomeworkDto: HomeworkCreateBodyDto,
  //   date: Date,
  // ): Promise<Homework> {
  //   const homework = this.createHomework(createHomeworkDto);
  //   const dateSchedule = this.dateScheduleService.getDateSchedule();
  // }
}
