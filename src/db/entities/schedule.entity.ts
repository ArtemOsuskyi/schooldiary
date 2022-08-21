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
import { TeacherSubject } from './teacherSubject.entity';
import { StudyCourse } from './studyCourse.entity';
import { Weekdays } from '../enums/weekday.enum';
import { DateSchedule } from './dateSchedule.entity';
import { nowDate } from '../../constants';
import dayjs from 'dayjs';

@Entity({ name: 'schedule' })
export class Schedule {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => TeacherSubject, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_subject_id', referencedColumnName: 'id' })
  teacherSubject: TeacherSubject;

  @ManyToOne(() => StudyCourse, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'study_course_id', referencedColumnName: 'id' })
  studyCourse: StudyCourse;

  @OneToMany(() => DateSchedule, (dateSchedule) => dateSchedule.schedule, {
    cascade: true,
  })
  dateSchedule: DateSchedule;

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
