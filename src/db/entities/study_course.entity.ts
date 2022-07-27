import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student }                                                          from './student.entity';
import { StudyClass }                                                       from './class.entity';
import { StudyYear }                                                        from './study_year.entity';

@Entity({ name: 'study_course' })
export class StudyCourse {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id: number;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @OneToMany(() => StudyClass, (study_class) => study_class.id,
    {
      cascade: true,
      nullable: false,
    })
  class: StudyClass;

  @ManyToOne(() => StudyYear)
  @JoinColumn({ name: 'study_year_id', referencedColumnName: 'id' })
  study_year: StudyYear;
}
