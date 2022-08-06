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

  async createUser(registerDto: RegisterBodyDto) {
    const { email, password, role } = registerDto;
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
    const user = await this.createUser(registerDto);
    if (user.role === Roles.STUDENT) {
      const student = await this.studentService.createStudent(studentCreateDto);
      student.user = user;
      await this.studentService.saveStudent(student);
      return await this.userRepository.save(user);
    } else throw new BadRequestException('Incorrect role');
  }

  async createTeacherUser(
    registerDto: RegisterBodyDto,
    teacherCreateDto: TeacherCreateBodyDto,
  ): Promise<User> {
    const user = await this.createUser(registerDto);
    if (user.role === Roles.TEACHER) {
      const teacher = await this.teacherService.createTeacher(teacherCreateDto);
      teacher.user = user;
      await this.teacherService.saveTeacher(teacher);
      return await this.userRepository.save(user);
    } else throw new BadRequestException('Incorrect role');
  }

  async assignExistingUserToTeacher(
    userId: number,
    teacherCreateDto: TeacherCreateBodyDto,
  ): Promise<User> {
    const user = await this.getUser(userId);
    const teacher = await this.teacherService.createTeacher(teacherCreateDto);
    if (isNil(user.teacher)) {
      teacher.user = user;
      await this.teacherService.saveTeacher(teacher);
    } else
      throw new BadRequestException(
        'This teacher already assigned to existing user',
      );
    return teacher.user;
  }

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
      { select: ['id', 'email', 'password', 'role'] },
    );
  }
}
