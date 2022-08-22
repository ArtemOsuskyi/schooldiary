import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateSchedule } from './dateSchedule.entity';
import { nowDate } from '../../constants';

@Entity({ name: 'homework' })
export class Homework {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => DateSchedule)
  @JoinColumn({ name: 'date_schedule_id', referencedColumnName: 'id' })
  dateSchedule: DateSchedule;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'deadline', type: 'date' })
  deadline: Date;

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
