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

@Entity({ name: 'study_year' })
export class StudyYear {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'start_date', type: 'date' })
  start_date: Date;

  @Column({ name: 'end_date', type: 'date' })
  end_date: Date;

  @OneToMany(() => StudyCourse, (studyCourse) => studyCourse.studyYear, {
    cascade: true,
  })
  studyCourses: StudyCourse[];

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
