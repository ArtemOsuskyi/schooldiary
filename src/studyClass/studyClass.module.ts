import { Module } from '@nestjs/common';
import { StudyClassService } from './studyClass.service';
import { StudyClassRepository } from './repository/studyСlass.repository';
import { StudyClassController } from './studyClass.controller';
import { TypeOrmExModule } from '../db/typeorm_ex.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([StudyClassRepository]),
    JwtModule,
  ],
  providers: [StudyClassService],
  controllers: [StudyClassController],
  exports: [StudyClassService],
})
export class StudyClassModule {}
