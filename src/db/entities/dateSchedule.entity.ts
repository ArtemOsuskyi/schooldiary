import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';
import { Homework } from './homework.entity';
import { Grade } from './grade.entity';
import { NA } from './NAs.entity';
import { nowDate } from '../../constants';

@Entity({ name: 'date_schedule' })
export class DateSchedule {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'schedule_id', referencedColumnName: 'id' })
  schedule: Schedule;

  @OneToMany(() => Homework, (homework) => homework.date_schedule, {
    cascade: true,
    nullable: true,
  })
  homework: Homework[];

  @OneToMany(() => Grade, (grade) => grade.dateSchedule, {
    cascade: true,
    nullable: true,
  })
  grades: Grade[];

  @OneToMany(() => NA, (na) => na.date_schedule, {
    cascade: true,
    nullable: true,
  })
  NAs: NA[];

  @Column({ name: 'date', type: 'date', default: nowDate })
  date: Date;

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
