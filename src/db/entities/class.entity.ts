import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudyCourse }                                       from './study_course.entity';

@Entity({ name: 'class' })
export class StudyClass {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @OneToMany( () => StudyCourse, (studyCourse) => studyCourse.class)
  study_course: StudyCourse
}
