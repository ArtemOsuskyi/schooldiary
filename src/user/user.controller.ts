import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../db/entities';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/id/:id')
  async getUser(@Param() params): Promise<User> {
    console.log(params.id);
    return this.userService.findUserById(params.id);
  }

  @Get('/email/:email')
  async getUserByEmail(@Param() params): Promise<User> {
    return await this.userService.findUserByEmail(params.email);
  }
}
