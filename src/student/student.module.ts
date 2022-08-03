import { forwardRef, Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../db/entities';
import { StudentRepository } from './repos/student.repository';
import { StudyCourseModule } from '../studyCourse/study_course.module';
import { NaModule } from '../na/na.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, StudentRepository]),
    forwardRef(() => StudyCourseModule),
    NaModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [TypeOrmModule, StudentService],
})
export class StudentModule {}
