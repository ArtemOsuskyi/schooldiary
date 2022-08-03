import { Module } from '@nestjs/common';
import { StudyYearService } from './studyYear.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyYear } from '../db/entities';
import { StudyYearRepository } from './repository/studyYear.repository';
import { StudyYearController } from './studyYear.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudyYear, StudyYearRepository])],
  providers: [StudyYearService],
  exports: [StudyYearService, TypeOrmModule],
  controllers: [StudyYearController],
})
export class StudyYearModule {}
