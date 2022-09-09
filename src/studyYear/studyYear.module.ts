import { Module } from '@nestjs/common';
import { StudyYearService } from './studyYear.service';
import { StudyYearRepository } from './repository/studyYear.repository';
import { StudyYearController } from './studyYear.controller';
import { TypeOrmExModule } from '../db/typeorm_ex.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([StudyYearRepository]),
    JwtModule,
  ],
  providers: [StudyYearService],
  controllers: [StudyYearController],
  exports: [StudyYearService],
})
export class StudyYearModule {}
