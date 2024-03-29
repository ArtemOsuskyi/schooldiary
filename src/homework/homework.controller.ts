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
import { HomeworkService } from './homework.service';
import { ApiTags } from '@nestjs/swagger';
import { Homework } from '../db/entities';
import { HomeworkCreateBodyDto } from './dto/homework-create.dto';
import { HomeworkEditDto } from './dto/homework-edit.dto';
import { HomeworkSearchDto } from './dto/homework-search.dto';
import { ApprovedRoles } from '../auth/decorators/role-decorator';
import { Roles } from '../db/enums/roles.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@ApiTags('homework')
@ApprovedRoles(Roles.TEACHER, Roles.STUDENT)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('homework')
export class HomeworkController {
  constructor(
    private readonly homeworkService: HomeworkService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/all')
  async getAllHomeworks(): Promise<Homework[]> {
    return await this.homeworkService.getAllHomework();
  }

  @Get('/get-all-for-current-student')
  async getAllForCurrentStudent(@Req() req: Request) {
    const userId = await this.jwtService.decode(req.cookies['token'])['id'];
    return await this.homeworkService.getAllHomeworksForCurrentStudent(userId);
  }

  @Get(':homeworkId')
  async getHomework(
    @Param('homeworkId') homeworkId: number,
  ): Promise<Homework> {
    return await this.homeworkService.getHomework(homeworkId);
  }

  @Post('/search')
  async searchHomework(
    @Body() homeworkSearchDto: HomeworkSearchDto,
  ): Promise<Homework[]> {
    return this.homeworkService.searchHomework(homeworkSearchDto);
  }

  @Post('/create')
  async createHomework(
    @Body() homeworkCreateDto: HomeworkCreateBodyDto,
  ): Promise<Homework> {
    return await this.homeworkService.createHomework(homeworkCreateDto);
  }

  @Patch('/edit/:homeworkId')
  async editHomework(
    @Param('homeworkId') homeworkId: number,
    @Body() homeworkEditDto: HomeworkEditDto,
  ): Promise<Homework> {
    return this.homeworkService.editHomework(homeworkId, homeworkEditDto);
  }

  @Delete(':homeworkId')
  async deleteHomework(
    @Param('homeworkId') homeworkId: number,
  ): Promise<Homework> {
    return await this.homeworkService.deleteHomework(homeworkId);
  }
}
