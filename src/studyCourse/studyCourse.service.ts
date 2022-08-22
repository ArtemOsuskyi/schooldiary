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
import { StudyClassService } from '../studyClass/studyClass.service';
import { StudyYearService } from '../studyYear/studyYear.service';
import { StudentRepository } from '../student/repos/student.repository';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { StudyCourseCreateBodyDto } from './dtos/study_course-create.dto';

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
    createStudyCourseDto: StudyCourseCreateBodyDto,
  ): Promise<StudyCourse> {
    const { classId, studyYearId } = createStudyCourseDto;
    //const student = await this.studentService.getStudent(studentId);
    const studyClass = await this.studyClassService.getClassById(classId);
    const studyYear = await this.studyYearService.getStudyYear(studyYearId);
    return await this.studyCourseRepository.save({
      class: studyClass,
      studyYear,
    });
  }

  async getAllStudyCourses(): Promise<StudyCourse[]> {
    return this.studyCourseRepository.find({
      relations: ['students'],
    });
  }

  async getStudyCourseById(studyCourseId: number): Promise<StudyCourse> {
    const studyCourse = await this.studyCourseRepository.findOne(
      studyCourseId,
      {
        relations: ['students', 'class', 'studyYear'],
      },
    );
    if (isNil(studyCourse)) throw new NotFoundException();
    return studyCourse;
  }

  async getStudyCourseForStudent(
    studyYearId: number,
    classId: number,
  ): Promise<StudyCourse> {
    const studyCourse = await this.studyCourseRepository.findOne({
      where: {
        studyYear: { id: studyYearId },
        class: { id: classId },
      },
    });
    if (isNil(studyCourse))
      throw new NotFoundException('Such study course not found');
    return studyCourse;
  }

  async assignStudyCourseToStudent(
    studyCourseId: number,
    studentId: number,
  ): Promise<StudyCourse> {
    const student = await this.studentService.getStudent(studentId);
    const studyCoursesToUpdate = student.studyCourses;
    const studyCourse = await this.getStudyCourseById(studyCourseId);
    studyCoursesToUpdate.push(studyCourse);
    student.studyCourses = studyCoursesToUpdate;
    await this.studentRepository.save(student);
    return studyCourse;
  }
}
