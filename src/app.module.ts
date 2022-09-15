import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyClassModule } from './studyClass/studyClass.module';
import { StudyYearModule } from './studyYear/studyYear.module';
import { StudyCourseModule } from './studyCourse/studyCourse.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AppService } from './app.service';
import { NaModule } from './na/na.module';
import { GradeModule } from './grade/grade.module';
import { SubjectModule } from './subject/subject.module';
import { HomeworkModule } from './homework/homework.module';
import { DateScheduleModule } from './dateSchedule/dateSchedule.module';
import { typeOrmAsyncConfig } from './db/typeorm-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    StudentModule,
    TeacherModule,
    ScheduleModule,
    AuthModule,
    UserModule,
    StudyClassModule,
    StudyYearModule,
    StudyCourseModule,
    NaModule,
    GradeModule,
    SubjectModule,
    HomeworkModule,
    DateScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
