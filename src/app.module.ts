import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudyClassModule } from './studyClass/studyClass.module';
import { StudyYearModule } from './studyYear/studyYear.module';
import { StudyCourseModule } from './studyCourse/studyCourse.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AppService } from './app.service';
import { NaModule } from './na/na.module';
import { GradeModule } from './grade/grade.module';
import { SubjectModule } from './subject/subject.module';
import { HomeworkModule } from './homework/homework.module';
import { StudyClassController } from './studyClass/studyClass.controller';
import { DateScheduleModule } from './dateSchedule/dateSchedule.module';
import * as Entities from 'src/db/entities/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: Object.values(Entities),
        synchronize: false,
        migrations: ['db/migrations/*.ts'],
        logging: true,
      }),
    }),
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
  controllers: [AppController, StudyClassController],
  providers: [AppService],
})
export class AppModule {}
