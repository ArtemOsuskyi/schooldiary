import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginBodyDto } from './dtos/login-dto';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repository/user.repository';
import { User } from '../db/entities';
import { StudentService } from '../student/student.service';
import { TeacherService } from '../teacher/teacher.service';
import { isNil } from '@nestjs/common/utils/shared.utils';

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
    if (!user) throw new UnauthorizedException();
    const payload = { email: user.email, id: user.id };
    const result = {
      accessToken: this.jwtService.sign(payload),
      data: await this.userService.getUser(user.id),
    };
    if (result.data.teacher === null) delete result.data.teacher;
    if (result.data.student === null) delete result.data.student;
    return result;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    if (isNil(user)) throw new BadRequestException('Wrong credentials');
    await this.validatePassword(password, user.password);
    return user;
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    if (!bcrypt.compareSync(password, hashedPassword)) {
      throw new BadRequestException('Wrong credentials');
    }
    return true;
  }
}
