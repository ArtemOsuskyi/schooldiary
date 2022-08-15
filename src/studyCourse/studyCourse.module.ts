import { forwardRef, Module } from '@nestjs/common';
import { StudyCourseService } from './studyCourse.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyCourse } from '../db/entities';
import { StudentModule } from '../student/student.module';
import { StudyClassModule } from '../studyClass/studyClass.module';
import { StudyYearModule } from '../studyYear/studyYear.module';
import { StudyCourseRepository } from './repository/study_course.repository';
import { StudyCourseController } from './studyCourse.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudyCourse, StudyCourseRepository]),
    StudyClassModule,
    StudyYearModule,
    forwardRef(() => StudentModule),
  ],
  providers: [StudyCourseService],
  exports: [StudyCourseService, TypeOrmModule],
  controllers: [StudyCourseController],
})
export class StudyCourseModule {}
