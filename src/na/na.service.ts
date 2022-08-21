import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { NA, Student } from '../db/entities';
import { NaRepository } from './repository/na.repository';
import { NaCreateBodyDto } from './dtos/na-create.dto';
import { StudentService } from '../student/student.service';
import { StudentRepository } from '../student/repos/student.repository';
import { DateScheduleService } from '../dateSchedule/dateSchedule.service';

@Injectable()
export class NaService {
  constructor(
    @InjectRepository(NA)
    private readonly naRepository: NaRepository,
    @InjectRepository(Student)
    private readonly studentRepository: StudentRepository,
    private readonly studentService: StudentService,
    private readonly dateScheduleService: DateScheduleService,
  ) {}

  async createNa(naCreateDto: NaCreateBodyDto): Promise<NA> {
    const { studentId, dateScheduleId, reason } = naCreateDto;
    const student = await this.studentService.getStudent(studentId);
    const dateSchedule = await this.dateScheduleService.getDataSchedule(
      dateScheduleId,
    );
    return this.naRepository.save({
      student,
      date_schedule: dateSchedule,
      reason,
    });
  }

  async getNa(naId: number): Promise<NA> {
    const na = await this.naRepository.findOne(naId);
    if (isNil(na)) throw new NotFoundException();
    return na;
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

  async getStudentNa(studentId: number): Promise<NA[]> {
    return await this.naRepository.getStudentNa(studentId);
  }

  async getStudentNaByDate(studentId: number, date: Date): Promise<NA[]> {
    return await this.naRepository.getStudentNaByDate(studentId, date);
  }
}
