import { Module } from '@nestjs/common';
import { TeacherSubjectService } from './teacherSubject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherSubject } from '../db/entities';
import { TeacherSubjectRepository } from './repository/teacherSubject.repository';
import { TeacherModule } from '../teacher/teacher.module';
import { SubjectModule } from '../subject/subject.module';
import { TeacherSubjectController } from './teacherSubject.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherSubject, TeacherSubjectRepository]),
    TeacherModule,
    SubjectModule,
  ],
  providers: [TeacherSubjectService],
  exports: [TypeOrmModule, TeacherSubjectService],
  controllers: [TeacherSubjectController],
})
export class TeacherSubjectModule {}
