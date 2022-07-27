import { Module }        from '@nestjs/common';
import { ClassService }  from './class.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyClass }    from '../db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([StudyClass])],
  providers: [ClassService],
})
export class ClassModule {
}
