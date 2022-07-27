import { forwardRef, Module } from '@nestjs/common';
import { StudyCourseService } from './study_course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyCourse } from '../db/entities';
import { StudentModule } from '../student/student.module';
import { StudyClassModule } from '../class/study_class.module';
import { StudyYearModule } from '../study_year/study_year.module';
import { StudyCourseRepository } from './repository/study_course.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudyCourse, StudyCourseRepository]),
    StudyClassModule,
    StudyYearModule,
    forwardRef(() => StudentModule),
  ],
  providers: [StudyCourseService],
  exports: [StudyCourseService, TypeOrmModule],
})
export class StudyCourseModule {}
