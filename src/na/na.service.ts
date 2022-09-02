import { Injectable, NotFoundException } from '@nestjs/common';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { NA } from '../db/entities';
import { NaRepository } from './repository/na.repository';
import { NaCreateBodyDto } from './dtos/na-create.dto';
import { StudentService } from '../student/student.service';
import { StudentRepository } from '../student/repos/student.repository';
import { DateScheduleService } from '../dateSchedule/dateSchedule.service';
import { NaSearchDto } from './dtos/na-search.dto';
import { NaEditDto } from './dtos/na-edit.dto';
import { Between } from 'typeorm';

@Injectable()
export class NaService {
  constructor(
    private readonly naRepository: NaRepository,
    private readonly studentRepository: StudentRepository,
    private readonly studentService: StudentService,
    private readonly dateScheduleService: DateScheduleService,
  ) {}

  async createNa(naCreateDto: NaCreateBodyDto): Promise<NA> {
    const { studentId, dateScheduleId, reason } = naCreateDto;
    const student = await this.studentService.getStudent(studentId);
    const dateSchedule = await this.dateScheduleService.getDateSchedule(
      dateScheduleId,
    );
    return this.naRepository.save({
      student,
      dateSchedule: dateSchedule,
      reason,
    });
  }

  async getAllNAs(): Promise<NA[]> {
    return this.naRepository.find({
      relations: {
        student: true,
        dateSchedule: true,
      },
    });
  }

  async getNa(naId: number): Promise<NA> {
    const na = await this.naRepository.findOne({
      where: { id: naId },
      relations: {
        student: true,
        dateSchedule: {
          schedule: true,
        },
      },
    });
    if (isNil(na)) throw new NotFoundException('NA not found');
    return na;
  }

  async editNa(naId: number, naEditDto: NaEditDto): Promise<NA> {
    const { studentId, dateScheduleId } = naEditDto;
    const na = await this.getNa(naId);
    return await this.naRepository.save({
      ...na,
      ...naEditDto,
      student: { id: studentId ?? na.student.id },
      dateSchedule: { id: dateScheduleId ?? na.dateSchedule.id },
    });
  }

  async searchNa(naSearchDto: NaSearchDto): Promise<NA[]> {
    const { date, subject, studentId, reason } = naSearchDto;
    return await this.naRepository.searchNA(date, subject, studentId, reason);
  }

  async deleteNa(naId: number): Promise<NA> {
    const na = await this.getNa(naId);
    return await this.naRepository.remove(na);
  }

  async countNa(
    fromDate: Date,
    toDate: Date,
    studyClassId?: number,
    studentId?: number,
  ) {
    return this.naRepository.findAndCount({
      where: {
        ...(!isNil(studyClassId) && {
          dateSchedule: {
            schedule: { studyCourse: { studyClass: { id: studyClassId } } },
          },
        }),
        ...(!isNil(studentId) && { student: { id: studentId } }),
        dateSchedule: {
          date: Between(fromDate, toDate),
        },
      },
      relations: {
        student: true,
        dateSchedule: true,
      },
    });
  }

  async assignNaToStudent(
    studentId: number,
    naCreateDto: NaCreateBodyDto,
  ): Promise<NA> {
    const student = await this.studentService.getStudent(studentId);
    const naToUpdate = student.NAs;
    const na = await this.createNa(naCreateDto);
    naToUpdate.push(na);
    student.NAs = naToUpdate;
    await this.studentRepository.save(student);
    return na;
  }
}
