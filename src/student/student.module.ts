import { forwardRef, Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentRepository } from './repos/student.repository';
import { StudyCourseModule } from '../studyCourse/studyCourse.module';
import { NaModule } from '../na/na.module';
import { TypeOrmExModule } from '../db/typeorm_ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([StudentRepository]),
    forwardRef(() => StudyCourseModule),
    NaModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService, TypeOrmExModule],
})
export class StudentModule {}
