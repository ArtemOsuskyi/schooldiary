import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginBodyDto } from './dtos/login-dto';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repository/user.repository';
import { User } from '../db/entities';
import { StudentService } from '../student/student.service';
import { TeacherService } from '../teacher/teacher.service';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { Roles } from '../db/enums/roles.enum';
import { studentDataSource, teacherDataSource } from '../db/typeorm-config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    loginDto: LoginBodyDto,
  ): Promise<{ accessToken: string; data: User }> {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    const payload = { email: user.email, id: user.id, role: user.role };
    delete user.password;
    if (user.role === Roles.TEACHER) {
      await teacherDataSource.initialize().then(() => {
        console.log('Switched connection to teacher');
      });
    }
    if (user.role === Roles.STUDENT) {
      await studentDataSource.initialize().then(() => {
        console.log('Switched connection to student');
      });
    }
    return {
      accessToken: this.jwtService.sign(payload),
      data: user,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    if (isNil(user)) throw new BadRequestException('Wrong credentials');
    await this.validatePassword(password, user.password);
    return user;
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    if (!bcrypt.compareSync(password, hashedPassword)) {
      throw new BadRequestException('Wrong credentials');
    }
    return true;
  }

  async checkToken(token: string): Promise<object> {
    return await this.jwtService.verify(token);
  }
}
