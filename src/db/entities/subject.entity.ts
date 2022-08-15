import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeacherSubject } from './teacherSubject.entity';
import { nowDate } from '../../constants';

@Entity({ name: 'subject' })
export class Subject {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.subject, {
    cascade: true,
  })
  teacher_subject: TeacherSubject;

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
