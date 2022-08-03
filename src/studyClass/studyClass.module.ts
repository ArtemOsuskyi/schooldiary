import { Module } from '@nestjs/common';
import { StudyClassService } from './studyClass.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyClass } from '../db/entities';
import { StudyClassRepository } from './repository/study_class.repository';
import { StudyClassController } from './studyClass.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudyClass, StudyClassRepository])],
  providers: [StudyClassService],
  exports: [StudyClassService, TypeOrmModule],
  controllers: [StudyClassController],
})
export class StudyClassModule {}
