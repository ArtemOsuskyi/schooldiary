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
import { NaService } from './na.service';
import { ApiTags } from '@nestjs/swagger';
import { NaCreateBodyDto } from './dtos/na-create.dto';
import { NA } from '../db/entities';
import { NaSearchDto } from './dtos/na-search.dto';
import { NaEditDto } from './dtos/na-edit.dto';
import { NaCountDto } from './dtos/na-count.dto';
import { ApprovedRoles } from '../auth/decorators/role-decorator';
import { Roles } from '../db/enums/roles.enum';
import { JwtService } from '@nestjs/jwt';
import { NaSearchCurrentStudentDto } from './dtos/na-searchCurrentStudent.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { NaDateSearchDto } from './dtos/na-dateSearch.dto';
import { Request } from 'express';

@ApiTags('NA')
@ApprovedRoles(Roles.STUDENT, Roles.TEACHER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('na')
export class NaController {
  constructor(
    private readonly naService: NaService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/all')
  async getAllNAs(): Promise<NA[]> {
    return await this.naService.getAllNAs();
  }

  @ApprovedRoles(Roles.STUDENT)
  @Get('/get-all-for-current-student')
  async getAllNAsForCurrentStudent(@Req() req: Request) {
    const userId = this.jwtService.decode(req.cookies['token'])['id'];
    return this.naService.getNAsForCurrentStudent(userId);
  }

  @Get(':naId')
  async getNa(@Param('naId') naId: number): Promise<NA> {
    return this.naService.getNa(naId);
  }

  @Post('create')
  async createNa(@Body() naCreateDto: NaCreateBodyDto): Promise<NA> {
    return this.naService.createNa(naCreateDto);
  }

  @Post('minimal-NAs')
  async minNA(@Body() naDateSearch: NaDateSearchDto) {
    const { startDate, endDate } = naDateSearch;
    return this.naService.getMinimalNAs(startDate, endDate);
  }

  @Patch('/edit/:naId')
  async editNa(
    @Param('naId') naId: number,
    @Body() naEditDto: NaEditDto,
  ): Promise<NA> {
    return this.naService.editNa(naId, naEditDto);
  }

  @Post('/count')
  async countNa(@Body() naCountDto: NaCountDto) {
    const { fromDate, toDate, studyClassId, studentId } = naCountDto;
    return this.naService.countNa(fromDate, toDate, studyClassId, studentId);
  }

  @Post('/search')
  async searchNa(@Body() naSearchDto: NaSearchDto): Promise<NA[]> {
    return this.naService.searchNa(naSearchDto);
  }

  @Post('/search-current-user')
  @ApprovedRoles(Roles.STUDENT)
  async searchCurrentStudentNa(
    @Req() req,
    @Body() naSearchDto: NaSearchCurrentStudentDto,
  ) {
    const studentId = this.jwtService.decode(req.cookies['token'])['id'];
    return this.naService.searchCurrentStudentNa(studentId, naSearchDto);
  }

  @Delete('/delete/:naId')
  async deleteNa(@Param('naId') naId: number): Promise<NA> {
    return this.naService.deleteNa(naId);
  }
}
