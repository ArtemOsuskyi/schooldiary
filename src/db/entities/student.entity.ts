import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudyCourse } from './studyCourse.entity';
import { Grade } from './grade.entity';
import { NA } from './NAs.entity';
import { User } from './user.entity';
import { nowDate } from '../../constants';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ name: 'patronymic', type: 'varchar' })
  patronymic: string;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToMany(() => StudyCourse, (studyCourse) => studyCourse.students)
  studyCourses: StudyCourse[];

  @OneToMany(() => Grade, (grade) => grade.student, {
    cascade: true,
    nullable: true,
  })
  grades: Grade[];

  @OneToMany(() => NA, (na) => na.student, {
    cascade: true,
  })
  NAs: NA[];

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate })
  updatedAt: Date;
}
