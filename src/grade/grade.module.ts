import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { GradeRepository } from './repository/grade.repository';
import { DateScheduleModule } from '../dateSchedule/dateSchedule.module';
import { TypeOrmExModule } from '../db/typeorm_ex.module';
import { JwtModule } from '@nestjs/jwt';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([GradeRepository]),
    DateScheduleModule,
    JwtModule,
    StudentModule,
  ],
  providers: [GradeService],
  controllers: [GradeController],
  exports: [GradeService],
})
export class GradeModule {}
