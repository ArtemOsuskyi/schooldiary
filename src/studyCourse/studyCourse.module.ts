import { forwardRef, Module } from '@nestjs/common';
import { StudyCourseService } from './studyCourse.service';
import { StudentModule } from '../student/student.module';
import { StudyClassModule } from '../studyClass/studyClass.module';
import { StudyYearModule } from '../studyYear/studyYear.module';
import { StudyCourseRepository } from './repository/studyCourse.repository';
import { StudyCourseController } from './studyCourse.controller';
import { TypeOrmExModule } from '../db/typeorm_ex.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([StudyCourseRepository]),
    StudyClassModule,
    StudyYearModule,
    forwardRef(() => StudentModule),
    JwtModule,
  ],
  providers: [StudyCourseService],
  controllers: [StudyCourseController],
  exports: [StudyCourseService],
})
export class StudyCourseModule {}
