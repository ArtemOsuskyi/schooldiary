import { Module } from '@nestjs/common';
import { StudyClassService } from './studyClass.service';
import { StudyClassRepository } from './repository/study_class.repository';
import { StudyClassController } from './studyClass.controller';
import { TypeOrmExModule } from '../db/typeorm_ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([StudyClassRepository])],
  providers: [StudyClassService],
  controllers: [StudyClassController],
  exports: [StudyClassService],
})
export class StudyClassModule {}
