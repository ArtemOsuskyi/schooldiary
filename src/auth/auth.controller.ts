import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginBodyDto } from './dtos/login-dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../db/entities';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginBodyDto,
  ): Promise<{ accessToken: string; data: User }> {
    return await this.authService.login(loginDto);
  }
}
