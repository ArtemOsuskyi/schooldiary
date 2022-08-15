import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../db/entities';
import { UserRepository } from './repository/user.repository';
import { RegisterBodyDto } from '../auth/dtos/register-dto';
import { StudentCreateBodyDto } from '../student/dtos/student-create-dto';
import { StudentService } from '../student/student.service';
import { Roles } from '../db/enums/roles.enum';
import * as bcrypt from 'bcrypt';
import { TeacherService } from '../teacher/teacher.service';
import { TeacherCreateBodyDto } from '../teacher/dtos/teacher-create-dto';
import { isNil } from '@nestjs/common/utils/shared.utils';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService,
  ) {}

  async createUser(registerDto: RegisterBodyDto, role: Roles) {
    const { email, password } = registerDto;
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) throw new BadRequestException('This user already exists');
    const hashPassword = await bcrypt.hash(password, 12);
    return await this.userRepository.save({
      email,
      password: hashPassword,
      role,
    });
  }

  async createStudentUser(
    registerDto: RegisterBodyDto,
    studentCreateDto: StudentCreateBodyDto,
  ): Promise<User> {
    const user = await this.createUser(registerDto, Roles.STUDENT);
    const student = await this.studentService.createStudent(
      studentCreateDto,
      user.id,
    );
    await this.studentService.saveStudent(student);
    user.student = student;
    await this.userRepository.save(user);
    return this.getUser(user.id);
  }

  async createTeacherUser(
    registerDto: RegisterBodyDto,
    teacherCreateDto: TeacherCreateBodyDto,
  ): Promise<User> {
    const user = await this.createUser(registerDto, Roles.TEACHER);
    const teacher = await this.teacherService.createTeacher(
      teacherCreateDto,
      user.id,
    );
    await this.teacherService.saveTeacher(teacher);
    user.teacher = teacher;
    await this.userRepository.save(user);
    return this.getUser(user.id);
  }

  // async assignTeacherToUser(userId: number, teacherId: number) {
  //   const user = await this.getUser(userId);
  //   user.teacher = await this.teacherService.getTeacher(teacherId);
  //   return user;
  // }

  async getUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['student', 'teacher'],
    });
    if (isNil(user)) throw new NotFoundException("User doesn't exist");
    if (user.teacher === null) delete user.teacher;
    if (user.student === null) delete user.student;
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne(
      { email },
      {
        select: ['id', 'email', 'password', 'role'],
      },
    );
  }
}
