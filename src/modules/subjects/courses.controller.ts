import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Inject,
    UseGuards,
    Patch,
  } from '@nestjs/common';
  import { ClientProxy } from '@nestjs/microservices';
  import { lastValueFrom } from 'rxjs';
  import { AuthGuard } from 'src/common/guards/auth.guard';
  import { RolesGuard } from 'src/common/guards/roles.guard';
  import { Roles } from 'src/common/decorators/role.decorator';
  import { UserRole } from 'src/common/enums/roles.enum';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
  
  @Controller("courses")
  export class CoursesController {
    constructor(
      @Inject("SUBJECTS_SERVICE") private readonly subjectService: ClientProxy,
    ) {}

    @UseGuards(AuthGuard, RolesGuard)
    // @Roles(UserRole.ADMIN)
    @Post("/create")
    async create(@Body() createCourseDto: CreateCourseDto) {
      console.log(createCourseDto);
      return await lastValueFrom(
        this.subjectService.send({ cmd: "create-course" }, createCourseDto),
      );
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll() {
      return await lastValueFrom(
        this.subjectService.send({ cmd: "get-all-courses" }, ""),
      );
    }

    @UseGuards(AuthGuard)
    @Get(":id")
    async findOne(@Param("id") id: string) {
      return await lastValueFrom(
        this.subjectService.send({ cmd: "get-course-by-id" }, id),
      );
    }

    @UseGuards(AuthGuard, RolesGuard)
    // @Roles(UserRole.TEACHER, UserRole.ADMIN)
    @Patch(":id")
    async update(
      @Param("id") id: string,
      @Body() updateCourseDto: UpdateCourseDto,
    ) {
      return await lastValueFrom(
        this.subjectService.send(
          { cmd: "update-course" },
          { id, updateCourseDto },
        ),
      );
    }
  }