import { Module } from '@nestjs/common';
import { StudyClassService } from './study_class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyClass } from '../db/entities';
import { StudyClassRepository } from './repository/study_class.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudyClass, StudyClassRepository])],
  providers: [StudyClassService],
  exports: [StudyClassService, TypeOrmModule],
})
export class StudyClassModule {}
