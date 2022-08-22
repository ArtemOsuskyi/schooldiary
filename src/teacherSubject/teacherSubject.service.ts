import { Injectable } from '@nestjs/common';
import { TeacherSubjectRepository } from './repository/teacherSubject.repository';
import { TeacherSubject } from '../db/entities';
import { TeacherService } from '../teacher/teacher.service';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class TeacherSubjectService {
  constructor(
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
    const teacherSubject = this.teacherSubjectRepository.create({
      teacher,
      subject,
    });
    if (await this.teacherSubjectRepository.findOne(teacherSubject))
      return teacherSubject;
    return await this.teacherSubjectRepository.save(teacherSubject);
  }

  async getAllTeacherSubjects(): Promise<TeacherSubject[]> {
    return await this.teacherSubjectRepository.find({
      relations: ['teacher', 'subject'],
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
