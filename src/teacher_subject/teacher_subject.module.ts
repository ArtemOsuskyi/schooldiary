import { Module } from '@nestjs/common';
import { TeacherSubjectService } from './teacher_subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherSubject } from '../db/entities';
import { TeacherSubjectRepository } from './repository/teacher_subject.repository';
import { TeacherModule } from '../teacher/teacher.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherSubject, TeacherSubjectRepository]),
    TeacherModule,
    SubjectModule,
  ],
  providers: [TeacherSubjectService],
  exports: [TypeOrmModule, TeacherSubjectService],
})
export class TeacherSubjectModule {}
