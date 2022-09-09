import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../../db/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const cookies = context.getArgs().map((v) => v.cookies);
    const userRole = this.getRole(cookies[0].token);
    const roles: string[] = this.reflector.getAllAndOverride('roles', [
      context.getClass(),
    ]);
    console.log(userRole, roles);
    if (roles.find((role) => role === userRole) || userRole === Roles.ADMIN)
      return true;
    throw new UnauthorizedException('Access denied');
  }

  private getRole(token: string) {
    return this.jwtService.decode(token)['role'];
  }
}
