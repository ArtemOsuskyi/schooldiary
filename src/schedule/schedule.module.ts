import { forwardRef, Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { ScheduleRepository } from './repository/schedule.repository';
import { DateScheduleModule } from '../dateSchedule/dateSchedule.module';
import { StudyCourseModule } from '../studyCourse/studyCourse.module';
import { TypeOrmExModule } from '../db/typeorm_ex.module';
import { TeacherModule } from '../teacher/teacher.module';
import { SubjectModule } from '../subject/subject.module';
import { JwtModule } from '@nestjs/jwt';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ScheduleRepository]),
    forwardRef(() => DateScheduleModule),
    forwardRef(() => StudyCourseModule),
    forwardRef(() => StudentModule),
    TeacherModule,
    SubjectModule,
    JwtModule,
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [TypeOrmExModule, ScheduleService],
})
export class ScheduleModule {}
