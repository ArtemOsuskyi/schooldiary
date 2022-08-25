import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './repos/teacher.repository';
import { TypeOrmExModule } from '../db/typeorm_ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TeacherRepository])],
  providers: [TeacherService],
  controllers: [TeacherController],
  exports: [TeacherService],
})
export class TeacherModule {}
