import { Injectable } from '@nestjs/common';
import { User } from '../db/entities';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne(
      { email },
      { select: ['password'] },
    );
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }
}
