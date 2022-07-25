import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository }                                                          from '@nestjs/typeorm';
import { JwtService }                                                                from '@nestjs/jwt';
import * as bcrypt                                                                   from 'bcrypt';
import { LoginDto }                                                                  from './dtos/login-dto';
import { RegisterDto }                                                               from './dtos/register-dto';
import { UserService }                                                               from '../user/user.service';
import { UserRepository }                                                            from '../user/user.repository';
import { User }                                                                      from '../db/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async register(registerDto: RegisterDto): Promise<User> {
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

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    //console.log(user)
    //console.log(password, user.password)
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result as User;
    } else return null;
  }

  async login(loginDto: LoginDto): Promise<{ access_token }> {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
