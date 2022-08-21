import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Student, Teacher, User } from '../db/entities';
import { UserRepository } from './repository/user.repository';
import { RegisterBodyDto } from '../auth/dtos/register-dto';
import { StudentCreateBodyDto } from '../student/dtos/student-create-dto';
import { StudentService } from '../student/student.service';
import { Roles } from '../db/enums/roles.enum';
import * as bcrypt from 'bcrypt';
import { TeacherService } from '../teacher/teacher.service';
import { TeacherCreateBodyDto } from '../teacher/dtos/teacher-create-dto';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService,
    private entityManager: EntityManager,
  ) {}

  async createUser(registerDto: RegisterBodyDto, role: Roles) {
    const { email, password } = registerDto;
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) throw new BadRequestException('This user already exists');
    const hashPassword = await bcrypt.hash(password, 12);
    return this.userRepository.create({
      email,
      password: hashPassword,
      role,
    });
  }

  async createStudentUser(
    registerDto: RegisterBodyDto,
    studentCreateDto: StudentCreateBodyDto,
  ): Promise<User> {
    return await this.entityManager.transaction(
      async (transactionEntityManager) => {
        const user: User = await transactionEntityManager.save(
          User,
          await this.createUser(registerDto, Roles.STUDENT),
        );
        user.student = await transactionEntityManager.save(
          Student,
          await this.studentService.createStudent(studentCreateDto, user.id),
        );
        return await transactionEntityManager.save(user);
      },
    );
  }

  async createTeacherUser(
    registerDto: RegisterBodyDto,
    teacherCreateDto: TeacherCreateBodyDto,
  ): Promise<User> {
    return await this.entityManager.transaction(
      async (transactionEntityManager) => {
        const user: User = await transactionEntityManager.save(
          User,
          await this.createUser(registerDto, Roles.TEACHER),
        );
        user.teacher = await transactionEntityManager.save(
          Teacher,
          await this.teacherService.createTeacher(teacherCreateDto, user.id),
        );
        return await transactionEntityManager.save(user);
      },
    );
  }

  async getUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['student', 'student.studyCourses', 'teacher'],
    });
    if (isNil(user)) throw new NotFoundException("User doesn't exist");
    if (isNil(user.teacher)) delete user.teacher;
    if (isNil(user.student)) delete user.student;
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne(
      { email },
      {
        select: ['id', 'email', 'password', 'role'],
        relations: ['student', 'teacher'],
      },
    );
    if (isNil(user)) return null;
    if (isNil(user.teacher)) delete user.teacher;
    if (isNil(user.student)) delete user.student;
    return user;
  }
}
