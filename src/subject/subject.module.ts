import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectRepository } from './repository/subject.repository';
import { SubjectController } from './subject.controller';
import { TeacherModule } from '../teacher/teacher.module';
import { TypeOrmExModule } from '../db/typeorm_ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([SubjectRepository]),
    TeacherModule,
  ],
  providers: [SubjectService],
  controllers: [SubjectController],
  exports: [SubjectService],
})
export class SubjectModule {}
