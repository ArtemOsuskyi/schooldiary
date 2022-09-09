import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudyYearService } from './studyYear.service';
import { StudyYearCreateBodyDto } from './dtos/studyYear-create.dto';
import { StudyYear } from '../db/entities';
import { StudyYearEditDto } from './dtos/studyYear-edit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';

@ApiTags('studyYear')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('studyYear')
export class StudyYearController {
  constructor(private readonly studyYearService: StudyYearService) {}

  @Get('getAll')
  async getAllStudyYears(): Promise<StudyYear[]> {
    return this.studyYearService.getAllStudyYear();
  }

  @Get(':studyYearId')
  async getStudyYear(
    @Param('studyYearId') studyYearId: number,
  ): Promise<StudyYear> {
    return this.studyYearService.getStudyYear(studyYearId);
  }

  @Post('/create')
  async createStudyYear(
    @Body() createStudyYearDto: StudyYearCreateBodyDto,
  ): Promise<StudyYear> {
    return await this.studyYearService.createStudyYear(createStudyYearDto);
  }

  @Patch('/edit/:studyYearId')
  async editStudyYear(
    @Param('studyYearId') studyYearId: number,
    @Body() studyYearEditDto: StudyYearEditDto,
  ): Promise<StudyYear> {
    return await this.studyYearService.editStudyYear(
      studyYearId,
      studyYearEditDto,
    );
  }

  @Delete(':studyYearId')
  async deleteStudyYear(
    @Param('studyYearId') studyYearId: number,
  ): Promise<StudyYear> {
    return await this.studyYearService.deleteStudyYear(studyYearId);
  }
}
