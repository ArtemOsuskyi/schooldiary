import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudyCourse } from './study_course.entity';
import { Grade } from './grade.entity';
import { NA } from './NAs.entity';
import { User } from './user.entity';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'first_name', type: 'varchar' })
  first_name: string;

  @Column({ name: 'last_name', type: 'varchar' })
  last_name: string;

  @Column({ name: 'patronymic', type: 'varchar' })
  patronymic: string;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(
    () => StudyCourse,
    (studyCourse: StudyCourse) => studyCourse.student,
    {
      cascade: true,
    },
  )
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

  @CreateDateColumn()
  createdAt: Date;
}
