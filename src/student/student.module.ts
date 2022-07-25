import { Module }            from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService }    from './student.service';
import { TypeOrmModule }     from '@nestjs/typeorm';
import { Student }           from '../db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [TypeOrmModule],
})
export class StudentModule {
}
