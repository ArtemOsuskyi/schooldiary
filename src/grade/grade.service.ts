import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grade } from '../db/entities';
import { GradeRepository } from './repository/grade.repository';
import { GradeType } from '../db/enums/grade_type.enum';
//import { GradeCreateDto } from './dtos/grade-create.dto';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: GradeRepository,
  ) {}

  async createGrade(value: number, type: GradeType): Promise<Grade> {
    return await this.gradeRepository.save({
      value,
      grade_type: type,
    });
  }

  // async assignGradeToStudent(createGradeDto: GradeCreateDto): Promise<Grade> {}
}
