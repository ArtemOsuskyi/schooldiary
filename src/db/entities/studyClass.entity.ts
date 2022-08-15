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

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @OneToMany(() => StudyCourse, (studyCourse) => studyCourse.class)
  study_course: StudyCourse;

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
