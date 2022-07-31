import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeacherSubject } from './teacher_subject.entity';
import { User } from './user.entity';

@Entity({ name: 'teacher' })
export class Teacher {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ name: 'first_name', type: 'varchar' })
  first_name: string;

  @Column({ name: 'last_name', type: 'varchar' })
  last_name: string;

  @Column({ name: 'patronymic', type: 'varchar' })
  patronymic: string;

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.teacher, {
    cascade: true,
  })
  teacher_subjects: TeacherSubject[];
}
