import { forwardRef, Module } from '@nestjs/common';
import { NaService } from './na.service';
import { NaRepository } from './repository/na.repository';
import { NaController } from './na.controller';
import { StudentModule } from '../student/student.module';
import { DateScheduleModule } from '../dateSchedule/dateSchedule.module';
import { TypeOrmExModule } from '../db/typeorm_ex.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([NaRepository]),
    forwardRef(() => StudentModule),
    DateScheduleModule,
    JwtModule,
  ],
  controllers: [NaController],
  providers: [NaService],
  exports: [NaService],
})
export class NaModule {}
