import { Controller, Get, Param } from '@nestjs/common';
import { User }                   from '../db/entities';
import { UserService }            from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get(':id')
  async getUser(@Param() params): Promise<User> {
    return this.userService.findUserById(params.id);
  }
}
