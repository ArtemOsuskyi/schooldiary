import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDto } from './dtos/login-dto';
import { RegisterBodyDto } from './dtos/register-dto';
import { User } from '../db/entities';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginBodyDto): Promise<{ access_token }> {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterBodyDto): Promise<User> {
    return await this.authService.register(registerDto);
  }
}
