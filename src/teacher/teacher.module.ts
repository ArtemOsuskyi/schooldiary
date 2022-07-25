import { Module }            from '@nestjs/common';
import { TeacherService }    from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule }     from '@nestjs/typeorm';
import { Teacher }           from '../db/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
  ],
  providers: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule {
}
