import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../db/entities';
import { UserService } from './user.service';
import { UserStudentCreateBodyDto } from './dtos/userStudent-create.dto';
import { UserTeacherCreateBodyDto } from './dtos/userTeacher-create.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/id/:userId')
  async getUser(@Param('userId') userId: number): Promise<User> {
    return this.userService.getUser(userId);
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.findUserByEmail(email);
  }

  @Post('/createStudent')
  async createUserStudent(
    @Body() userStudentCreateDto: UserStudentCreateBodyDto,
  ): Promise<User> {
    return await this.userService.createStudentUser(
      userStudentCreateDto.user,
      userStudentCreateDto.student,
    );
  }

  @Post('/createTeacher')
  async createUserTeacher(
    @Body() userTeacherCreateDto: UserTeacherCreateBodyDto,
  ): Promise<User> {
    return await this.userService.createTeacherUser(
      userTeacherCreateDto.user,
      userTeacherCreateDto.teacher,
    );
  }

  // @Post('assignTeacherToUser/:userId')
  // async assignTeacherToExistingUser(
  //   @Param('userId') userId: number,
  //   @Body() createTeacherDto: TeacherCreateBodyDto,
  // ): Promise<User> {
  //   return this.userService.assignExistingUserToTeacher(
  //     userId,
  //     createTeacherDto,
  //   );
  // }
}
