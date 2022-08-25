import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { nowDate } from '../../constants';
import { Subject } from './subject.entity';

@Entity({ name: 'teacher' })
export class Teacher {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ name: 'patronymic', type: 'varchar' })
  patronymic: string;

  @ManyToMany(() => Subject, (subject) => subject.teachers, {
    nullable: true,
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'teacher_subject',
    joinColumn: {
      name: 'subject_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'teacher_id',
      referencedColumnName: 'id',
    },
  })
  subjects: Subject[];

  @CreateDateColumn({ default: nowDate, select: false })
  createdAt: Date;

  @UpdateDateColumn({ default: nowDate, select: false })
  updatedAt: Date;
}
