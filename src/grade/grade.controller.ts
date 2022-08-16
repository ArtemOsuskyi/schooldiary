import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GradeService } from './grade.service';
import { Grade } from '../db/entities';
import { GradeCreateBodyDto } from './dtos/grade-create.dto';

@ApiTags('grade')
@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

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

  @Delete(':gradeId')
  async removeGrade(@Param('gradeId') gradeId: number): Promise<Grade> {
    return await this.gradeService.removeGrade(gradeId);
  }
}
