import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginBodyDto } from './dtos/login-dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginBodyDto,
    @Req() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(loginDto);
    response.cookie('token', result.accessToken);
    return result;
  }

  @Post('/checkToken')
  async checkToken(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = req.cookies['token'];
    try {
      return await this.authService.checkToken(token);
    } catch (error) {
      req.cookies['token'] = '';
      response.clearCookie('token');
      throw new BadRequestException('Token expired');
    }
  }
}
