import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudyCourse } from './studyCourse.entity';
import { Weekdays } from '../enums/weekday.enum';
import { DateSchedule } from './dateSchedule.entity';
import { nowDate } from '../../constants';
import dayjs from 'dayjs';
import { Teacher } from './teacher.entity';
import { Subject } from './subject.entity';

@Entity({ name: 'schedule' })
@Index(['teacher', 'subject'], { unique: true })
export class Schedule {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => StudyCourse, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'study_course_id', referencedColumnName: 'id' })
  studyCourse: StudyCourse;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'teacher_id', referencedColumnName: 'id' })
  teacher: Teacher;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subject_id', referencedColumnName: 'id' })
  subject: Subject;

  @OneToMany(() => DateSchedule, (dateSchedule) => dateSchedule.schedule, {
    cascade: true,
  })
  dateSchedule: DateSchedule[];

  @Column({ name: 'lesson_number', type: 'int4' })
  lessonNumber: number;

  @Column({
    name: 'weekday',
    type: 'enum',
    enum: Weekdays,
    default: dayjs().format('dddd'),
  })
  weekday: Weekdays;

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
