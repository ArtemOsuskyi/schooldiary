import { Module }         from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService }    from './auth.service';
import { UserModule }     from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule }      from '@nestjs/jwt';
import { JwtStrategy }    from './strategies/jwt.strategy';
import { UserService }    from '../user/user.service';
import { LocalStrategy }  from './strategies/local.strategy';
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {
}
