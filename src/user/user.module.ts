import { Module }         from '@nestjs/common';
import { UserService }    from './user.service';
import { TypeOrmModule }  from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User }           from '../db/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {
}
