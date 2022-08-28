import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Subject } from '../db/entities';
import { SubjectRepository } from './repository/subject.repository';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { TeacherService } from '../teacher/teacher.service';
import { In } from 'typeorm';
import { SubjectSearchDto } from './dtos/subject-search.dto';

@Injectable()
export class SubjectService {
  constructor(
    private readonly subjectRepository: SubjectRepository,
    @Inject(forwardRef(() => TeacherService))
    private readonly teacherService: TeacherService,
  ) {}

  async createSubject(name: string, teacherId: number): Promise<Subject> {
    const subject = await this.getSubjectByName(name);
    if (!isNil(subject)) {
      const teacher = await this.teacherService.getTeacher(teacherId);
      if (teacher.subjects.find((sub) => sub.id === subject.id)) return subject;
      subject.teachers.push(teacher);
      return await this.subjectRepository.save({
        ...subject,
      });
    } else
      return await this.subjectRepository.save({
        name,
        teachers: [{ id: teacherId }],
      });
  }

  async getAllSubjects(): Promise<Subject[]> {
    return await this.subjectRepository.find({
      relations: {
        teachers: true,
      },
    });
  }

  async getSubject(subjectId: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
      relations: {
        teachers: true,
      },
    });
    if (isNil(subject)) throw new NotFoundException('Subject not found');
    return subject;
  }

  async getSubjectByName(name: string): Promise<Subject> {
    return this.subjectRepository.getSubjectByName(name);
  }

  async getTeacherBySubjects(names: string[]): Promise<Subject[]> {
    const result = await this.subjectRepository.find({
      where: { name: In(names) },
      relations: {
        teachers: true,
      },
    });
    result.reduce((acc, currentValue) => {
      console.log(currentValue);
      return acc;
    }, []);
    return result;
  }

  async searchSubject(subjectSearchDto: SubjectSearchDto) {
    const { subjectName, teacherId } = subjectSearchDto;
    return this.subjectRepository.searchSubject(subjectName, teacherId);
  }

  async deleteSubject(subjectId: number): Promise<Subject> {
    const subject = await this.getSubject(subjectId);
    return await this.subjectRepository.remove(subject);
  }

  async assignSubjectsToTeacher(subjects: string[], teacherId: number) {
    for (const subjectName of subjects) {
      const teacher = await this.teacherService.getTeacher(teacherId);
      const subject = await this.getSubjectByName(subjectName);
      if (isNil(subject)) {
        await this.subjectRepository.save(
          await this.createSubject(subjectName, teacherId),
        );
      } else {
        subject.teachers.push(teacher);
        await this.subjectRepository.save({
          ...subject,
        });
      }
    }
    return await this.teacherService.getTeacher(teacherId);
  }
}
