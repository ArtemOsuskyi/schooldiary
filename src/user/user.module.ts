import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from '../db/entities';
import { UserRepository } from './repository/user.repository';
import { StudentModule } from '../student/student.module';
import { TeacherModule } from '../teacher/teacher.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    StudentModule,
    TeacherModule,
    SubjectModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
