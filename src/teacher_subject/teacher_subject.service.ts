import { Injectable } from '@nestjs/common';
import { TeacherSubjectRepository } from './repository/teacher_subject.repository';
import { TeacherSubject } from '../db/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherService } from '../teacher/teacher.service';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class TeacherSubjectService {
  constructor(
    @InjectRepository(TeacherSubject)
    private readonly teacherSubjectRepository: TeacherSubjectRepository,
    private readonly teacherService: TeacherService,
    private readonly subjectService: SubjectService,
  ) {}

  async createTeacherSubject(
    teacherId: number,
    subjectId: number,
  ): Promise<TeacherSubject> {
    const teacher = await this.teacherService.getTeacher(teacherId);
    const subject = await this.subjectService.getSubject(subjectId);
    return await this.teacherSubjectRepository.save({
      teacher,
      subject,
    });
  }

  async getTeacherSubject(teacherSubjectId: number): Promise<TeacherSubject> {
    return await this.teacherSubjectRepository.findOne(
      {
        id: teacherSubjectId,
      },
      {
        relations: ['teacher', 'subject'],
      },
    );
  }

  async assignSubjectToTeacher(teacherId: number, subjectId: number) {
    const teacher = await this.teacherService.getTeacher(teacherId);
    const teacherSubjects = teacher.teacher_subjects;
    const subject = await this.subjectService.getSubject(subjectId);
    if (
      teacherSubjects
        .map((subjects) => {
          return subjects.subject;
        })
        .includes(subject)
    )
      return null;
    const subjectToPush = await this.createTeacherSubject(teacherId, subjectId);
    teacherSubjects.push(subjectToPush);
    teacher.teacher_subjects = teacherSubjects;
    return subjectToPush;
  }
}
