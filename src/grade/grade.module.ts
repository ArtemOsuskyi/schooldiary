import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { Grade } from '../db/entities';
import { GradeRepository } from './repository/grade.repository';
import { DateScheduleModule } from '../dateSchedule/dateSchedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grade, GradeRepository]),
    DateScheduleModule,
  ],
  providers: [GradeService],
  controllers: [GradeController],
  exports: [TypeOrmModule, GradeService],
})
export class GradeModule {}
