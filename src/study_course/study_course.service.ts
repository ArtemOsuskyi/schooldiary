import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student, StudyCourse } from '../db/entities';
import { StudyCourseRepository } from './repository/study_course.repository';
import { StudentService } from '../student/student.service';
import { StudyClassService } from '../class/study_class.service';
import { StudyYearService } from '../study_year/study_year.service';
import { StudentRepository } from '../student/repos/student.repository';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { StudyCourseCreateDto } from './study_course-create.dto';

@Injectable()
export class StudyCourseService {
  constructor(
    @InjectRepository(StudyCourse)
    private readonly studyCourseRepository: StudyCourseRepository,
    @InjectRepository(Student)
    private readonly studentRepository: StudentRepository,
    @Inject(forwardRef(() => StudentService))
    private readonly studentService: StudentService,
    private readonly studyClassService: StudyClassService,
    private readonly studyYearService: StudyYearService,
  ) {}

  async createStudyCourse(
    createStudyCourseDto: StudyCourseCreateDto,
  ): Promise<StudyCourse> {
    const { student_id, class_id, study_year_id } = createStudyCourseDto;
    const student = await this.studentService.getStudent(student_id);
    const studyClass = await this.studyClassService.getClass(class_id);
    const studyYear = await this.studyYearService.getStudyYear(study_year_id);
    return await this.studyCourseRepository.save({
      student,
      class: studyClass,
      study_year: studyYear,
    });
  }

  async getStudyCourse(studyCourseId: number): Promise<StudyCourse> {
    const studyYear = await this.studyCourseRepository.findOne(studyCourseId);
    if (isNil(studyYear)) throw new NotFoundException();
    return studyYear;
  }

  async assignStudyCourseToStudent(
    studyCourseId: number,
    studentId: number,
  ): Promise<StudyCourse> {
    const student = await this.studentService.getStudent(studentId);
    const studyCoursesToUpdate = student.studyCourses;
    const studyCourse = await this.getStudyCourse(studyCourseId);
    studyCoursesToUpdate.push(studyCourse);
    student.studyCourses = studyCoursesToUpdate;
    await this.studentRepository.save(student);
    return studyCourse;
  }
}