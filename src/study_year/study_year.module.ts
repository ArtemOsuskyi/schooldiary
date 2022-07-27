import { Module } from '@nestjs/common';
import { StudyYearService } from './study_year.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyYear } from '../db/entities';
import { StudyYearRepository } from './repository/study_year.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudyYear, StudyYearRepository])],
  providers: [StudyYearService],
  exports: [StudyYearService, TypeOrmModule],
})
export class StudyYearModule {}
