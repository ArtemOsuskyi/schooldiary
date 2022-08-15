import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { NA, Student } from '../db/entities';
import { NaRepository } from './repository/na.repository';
import { NaCreateDto } from './dtos/na-create.dto';
import { StudentService } from '../student/student.service';
import { StudentRepository } from '../student/repos/student.repository';

@Injectable()
export class NaService {
  constructor(
    @InjectRepository(NA)
    private readonly naRepository: NaRepository,
    @InjectRepository(Student)
    private readonly studentRepository: StudentRepository,
    private readonly studentService: StudentService,
  ) {}

  async createNa(naCreateDto: NaCreateDto): Promise<NA> {
    const { student_id, date_schedule_id, reason } = naCreateDto;
    return this.naRepository.create({
      student: { id: student_id },
      date_schedule: { id: date_schedule_id },
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
    naCreateDto: NaCreateDto,
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
