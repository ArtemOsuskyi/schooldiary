import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudyCourse } from './studyCourse.entity';
import { nowDate } from '../../constants';

@Entity({ name: 'class' })
export class StudyClass {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'name', type: 'varchar', unique: true })
  name: string;

  @OneToMany(() => StudyCourse, (studyCourse) => studyCourse.studyClass)
  studyCourses: StudyCourse[];

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
