import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService }                                                                from '@nestjs/jwt';
import * as bcrypt                                                                   from 'bcrypt';
import { LoginDto }                                                                  from './dtos/login-dto';
import { RegisterDto }                                                               from './dtos/register-dto';
import { userRepository }                                                            from '../user/user.repository';
import { UserService }                                                               from '../user/user.service';
import { User }                                                                      from '../db/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password, role } = registerDto;
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) throw new BadRequestException('This user already exists');
    const hashPassword = await bcrypt.hash(password, 12);
    return await userRepository.save({
      email,
      hashPassword,
      role,
    });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result as User;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<{ access_token }> {
    const { email, password } = loginDto;
    if (!await this.userService.findUserByEmail(email))
      throw new NotFoundException('This user doesn\'t exist');
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
