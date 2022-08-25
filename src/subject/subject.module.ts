import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '../db/entities';
import { SubjectRepository } from './repository/subject.repository';
import { SubjectController } from './subject.controller';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subject, SubjectRepository]),
    TeacherModule,
  ],
  providers: [SubjectService],
  controllers: [SubjectController],
  exports: [TypeOrmModule, SubjectService],
})
export class SubjectModule {}
