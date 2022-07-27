import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeacherSubject }                                    from './teacher_subject.entity';

@Entity({ name: 'teacher' })
export class Teacher {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @Column({ name: 'first_name', type: 'varchar' })
  first_name: string;

  @Column({ name: 'last_name', type: 'varchar' })
  last_name: string;

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.teacher)
  teacher_subjects: TeacherSubject[];

  @Column({ name: 'patronymic', type: 'varchar' })
  patronymic: string;
}
