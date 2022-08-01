import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginBodyDto } from './dtos/login-dto';
import { RegisterBodyDto } from './dtos/register-dto';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { User } from '../db/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterBodyDto): Promise<User> {
    const { email, password, role } = registerDto;
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) throw new BadRequestException('This user already exists');
    const hashPassword = await bcrypt.hash(password, 12);
    //console.log(email, password, role)
    return await this.userRepository.save({
      email,
      password: hashPassword,
      role,
    });
  }

  async login(loginDto: LoginBodyDto): Promise<{ access_token }> {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
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
