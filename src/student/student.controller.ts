import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StudentService }                             from './student.service';
import { Student }                                    from '../db/entities';
import { StudentCreateDto }                           from './dtos/student-create-dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {
  }

  @Get()
  async getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudent(@Param() params): Promise<Student> {
    return this.studentService.getStudent(params.id);
  }

  @Post('create')
  async createStudent(@Body() createStudentDto: StudentCreateDto): Promise<Student> {
    return this.studentService.createStudent(createStudentDto);
  }

  @Delete('delete/:id')
  async deleteStudent(@Param() params): Promise<Student> {
    return this.studentService.deleteStudent(params.id);
  }
}

