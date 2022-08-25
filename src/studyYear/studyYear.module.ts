import { Module } from '@nestjs/common';
import { StudyYearService } from './studyYear.service';
import { StudyYearRepository } from './repository/studyYear.repository';
import { StudyYearController } from './studyYear.controller';
import { TypeOrmExModule } from '../db/typeorm_ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([StudyYearRepository])],
  providers: [StudyYearService],
  controllers: [StudyYearController],
  exports: [StudyYearService],
})
export class StudyYearModule {}
