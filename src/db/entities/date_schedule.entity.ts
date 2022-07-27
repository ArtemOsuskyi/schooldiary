import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';
import { Homework } from './homework.entity';
import { Grade } from './grade.entity';
import { NA } from './NAs.entity';

@Entity({ name: 'date_schedule' })
export class DateSchedule {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => Schedule)
  @JoinColumn({ name: 'schedule_id', referencedColumnName: 'id' })
  schedule: Schedule;

  @OneToMany(() => Homework, (homework) => homework.date_schedule, {
    cascade: true,
  })
  homework: Homework[];

  @OneToMany(() => Grade, (grade) => grade.date_schedule, {
    cascade: true,
  })
  grades: Grade[];

  @OneToMany(() => NA, (na) => na.date_schedule, {
    cascade: true,
  })
  NAs: NA[];

  @Column({ name: 'date', type: 'date' })
  date: Date;
}
