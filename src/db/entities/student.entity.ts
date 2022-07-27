import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudyCourse }                                                         from './study_course.entity';
import { Grade }                                                               from './grade.entity';
import { NA }                                                                  from './NAs.entity';

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

  @OneToMany(() => StudyCourse, (studyCourse: StudyCourse) => studyCourse.student)
  studyCourses: StudyCourse[];

  @OneToMany( () => Grade, (grade) => grade.student, {
    cascade: true,
    nullable: true,
  })
  grades: Grade[]

  @OneToMany( () => NA, (na) => na.student)
  NAs: NA[]

  @CreateDateColumn()
  createdAt: Date;
}
