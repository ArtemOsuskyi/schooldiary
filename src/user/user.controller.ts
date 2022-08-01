import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../db/entities';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/id/:userId')
  async getUser(@Param('userId') userId: number): Promise<User> {
    return this.userService.findUserById(userId);
  }

  @Get('/email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.findUserByEmail(email);
  }
}
