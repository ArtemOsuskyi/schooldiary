import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '../db/entities';
import { TeacherRepository } from './repos/teacher.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, TeacherRepository])],
  providers: [TeacherService],
  controllers: [TeacherController],
  exports: [TypeOrmModule, TeacherService],
})
export class TeacherModule {}
