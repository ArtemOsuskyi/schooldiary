import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { StudentModule } from '../student/student.module';
import { TeacherModule } from '../teacher/teacher.module';
import { SubjectModule } from '../subject/subject.module';
import { TypeOrmExModule } from '../db/typeorm_ex.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    StudentModule,
    TeacherModule,
    SubjectModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmExModule],
})
export class UserModule {}
