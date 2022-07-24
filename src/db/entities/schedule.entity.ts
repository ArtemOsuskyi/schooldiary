import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherSubject }                                                from './teacher_subject.entity';
import { StudyCourse }                                                   from './study_course.entity';
import { Weekdays }                                                      from '../enums/weekday.enum';

@Entity({ name: 'schedule' })
export class Schedule {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => TeacherSubject)
  @JoinColumn({ name: 'teacher_subject_id', referencedColumnName: 'id' })
  teacher_subject: TeacherSubject;

  @ManyToOne(() => StudyCourse)
  @JoinColumn({ name: 'study_course_id', referencedColumnName: 'id' })
  study_course: StudyCourse;

  @Column({ name: 'lesson_number', type: 'integer' })
  lesson_number: number;

  @Column({ name: 'weekday', type: 'enum', enum: Weekdays })
  weekday: Weekdays;
}
