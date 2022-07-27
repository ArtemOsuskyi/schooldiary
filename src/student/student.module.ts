import { forwardRef, Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../db/entities';
import { StudentRepository } from './repos/student.repository';
import { StudyCourseModule } from '../study_course/study_course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, StudentRepository]),
    forwardRef(() => StudyCourseModule),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [TypeOrmModule, StudentService],
})
export class StudentModule {}
