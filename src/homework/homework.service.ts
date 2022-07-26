import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Homework } from '../db/entities';
import { HomeworkCreateBodyDto } from './dto/homework-create.dto';
import { HomeworkRepository } from './repository/homework.repository';
import { DateScheduleService } from '../dateSchedule/dateSchedule.service';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { HomeworkEditDto } from './dto/homework-edit.dto';
import { HomeworkSearchDto } from './dto/homework-search.dto';
import { StudentService } from '../student/student.service';

@Injectable()
export class HomeworkService {
  constructor(
    private readonly homeworkRepository: HomeworkRepository,
    private readonly dateScheduleService: DateScheduleService,
    private readonly studentService: StudentService,
  ) {}

  async createHomework(
    homeworkCreateDto: HomeworkCreateBodyDto,
  ): Promise<Homework> {
    const { description, deadline, dateScheduleId } = homeworkCreateDto;
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
      relations: {
        dateSchedule: true,
      },
    });
    if (isNil(homework)) throw new NotFoundException('Homework not found');
    return homework;
  }

  async getAllHomework(): Promise<Homework[]> {
    return await this.homeworkRepository.find({
      relations: {
        dateSchedule: {
          schedule: {
            subject: true,
            studyCourse: {
              studyClass: true,
            },
          },
        },
      },
    });
  }

  async getAllHomeworksForCurrentStudent(userId: number) {
    const student = await this.studentService.getStudentByUserId(userId);
    return await this.homeworkRepository.find({
      where: {
        dateSchedule: {
          schedule: {
            subject: true,
            studyCourse: {
              studyClass: { id: student.studyCourses[0].studyClass.id },
            },
          },
        },
      },
      relations: {
        dateSchedule: {
          schedule: {
            subject: true,
            teacher: true,
            studyCourse: {
              studyClass: true,
            },
          },
        },
      },
    });
  }

  async searchHomework(
    homeworkSearchDto: HomeworkSearchDto,
  ): Promise<Homework[]> {
    return this.homeworkRepository.searchHomework(homeworkSearchDto);
  }

  async editHomework(
    homeworkId: number,
    homeworkEditDto: HomeworkEditDto,
  ): Promise<Homework> {
    const homework = await this.getHomework(homeworkId);
    if (
      !isNil(homeworkEditDto.deadline) &&
      homeworkEditDto.deadline < homework.deadline
    )
      throw new BadRequestException('This deadline already expired');
    return await this.homeworkRepository.save({
      ...homework,
      ...homeworkEditDto,
      dateSchedule: !isNil(homeworkEditDto.date)
        ? await this.dateScheduleService.getDateScheduleByDate(
            homeworkEditDto.date,
          )
        : homework.dateSchedule,
    });
  }

  async deleteHomework(homeworkId: number): Promise<Homework> {
    const homework = await this.getHomework(homeworkId);
    return await this.homeworkRepository.remove(homework);
  }
}
