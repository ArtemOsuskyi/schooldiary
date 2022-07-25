import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy }                  from '@nestjs/passport';
import { Strategy }                          from 'passport-local';
import { AuthService }                       from '../auth.service';
import { LoginDto }                          from '../dtos/login-dto';
import { User }                              from '../../db/entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    //console.log(email, password)
    const user = await this.authService.validateUser(email, password);
    //console.log(user)
    if (!user) throw new UnauthorizedException();
    return user;
  }
}