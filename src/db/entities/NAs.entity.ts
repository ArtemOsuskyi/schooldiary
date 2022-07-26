import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { DateSchedule } from './dateSchedule.entity';
import { nowDate } from '../../constants';

@Entity({ name: 'NA' }) //NA - Not Attended
export class NA {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => Student, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @ManyToOne(() => DateSchedule, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'date_schedule_id', referencedColumnName: 'id' })
  dateSchedule: DateSchedule;

  @Column({ name: 'reason', type: 'varchar' })
  reason: string;

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
