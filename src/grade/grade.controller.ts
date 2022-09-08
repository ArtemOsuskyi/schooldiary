import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GradeService } from './grade.service';
import { Grade } from '../db/entities';
import { GradeCreateBodyDto } from './dtos/grade-create.dto';
import { GradeSearchDto } from './dtos/grade-search.dto';
import { GradeEditDto } from './dtos/grade-edit.dto';
import { GradeAverageDto } from './dtos/grade-average.dto';
import { ApprovedRoles } from '../auth/decorators/role-decorator';
import { Roles } from '../db/enums/roles.enum';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { GradeSearchCurrentStudentDto } from './dtos/grade-searchCurrentStudent.dto';

@ApiTags('grade')
@UseGuards(JwtAuthGuard)
@ApprovedRoles(Roles.TEACHER)
@Controller('grade')
export class GradeController {
  constructor(
    private readonly gradeService: GradeService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/getAll')
  async getAllGrades(): Promise<Grade[]> {
    return await this.gradeService.getGrades();
  }

  @Get(':gradeId')
  async getGrade(@Param('gradeId') gradeId: number): Promise<Grade> {
    return this.gradeService.getGrade(gradeId);
  }

  @Post('/create')
  async createGrade(
    @Body() gradeCreateDto: GradeCreateBodyDto,
  ): Promise<Grade> {
    return await this.gradeService.createGrade(gradeCreateDto);
  }

  @Post('/search')
  async searchGrades(@Body() gradeSearchDto: GradeSearchDto): Promise<Grade[]> {
    return await this.gradeService.searchGrades(gradeSearchDto);
  }

  @Post('/currentStudentSearch')
  @ApprovedRoles(Roles.STUDENT)
  async searchGradesForCurrentStudent(
    @Req() req: Request,
    @Body() gradeSearchDto: GradeSearchCurrentStudentDto,
  ) {
    const studentId = this.jwtService.decode(req.cookies['token'])['id'];
    return this.gradeService.searchGradesForCurrentStudent(
      studentId,
      gradeSearchDto,
    );
  }

  @Post('/getAverageForClass')
  async getAverageGradeForClass(@Body() gradeAverageDto: GradeAverageDto) {
    const { classId, subjectId, gradeType, studyYearId } = gradeAverageDto;
    return this.gradeService.getAverageGradesByClass(
      classId,
      subjectId,
      gradeType,
      studyYearId,
    );
  }

  @Patch('/edit/:gradeId')
  async editGrade(
    @Param('gradeId') gradeId: number,
    @Body() gradeEditDto: GradeEditDto,
  ): Promise<Grade> {
    return this.gradeService.editGrade(gradeId, gradeEditDto);
  }

  @Delete(':gradeId')
  async removeGrade(@Param('gradeId') gradeId: number): Promise<Grade> {
    return await this.gradeService.removeGrade(gradeId);
  }
}
