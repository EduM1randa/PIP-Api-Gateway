import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  UseGuards,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CreateSubjectDto } from "./dto/create-subject.dto";
import { UpdateSubjectDto } from "./dto/update-subject.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { UserRole } from "src/common/enums/roles.enum";

@Controller("subjects")
export class SubjectsController {
  constructor(
    @Inject("SUBJECTS_SERVICE") private readonly subjectService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @Post("/create")
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "create-subject" }, createSubjectDto),
    );
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-subject-by-id" }, id),
    );
  }

  @UseGuards(AuthGuard)
  @Get("get-by-course/:courseId")
  async findByCourse(@Param("courseId") courseId: string) {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-subjects-by-course" }, courseId),
    );
  }

  @UseGuards(AuthGuard)
  @Get("get-by-student/:studentId/:year")
  async findByStudent(
    @Param("studentId") studentId: string,
    @Param("year") year: number,
  ) {
    return await lastValueFrom(
      this.subjectService.send(
        { cmd: "get-subjects-by-student" },
        { studentId, year },
      ),
    );
  }

  @UseGuards(AuthGuard)
  @Get("get-by-teacher/:teacherId/:year")
  async findByTeacher(
    @Param("teacherId") teacherId: string,
    @Param("year") year: number,
  ) {

    return await lastValueFrom(
      this.subjectService.send(
        { cmd: "get-subjects-by-teacher" },
        { teacherId, year },
      ),
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return await lastValueFrom(
      this.subjectService.send(
        { cmd: "update-subject" },
        { id, updateSubjectDto },
      ),
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @Get("get-subject-schedules/:id")
  async getSubjectSchedules(@Param("id") subjectId: string) {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-subject-schedules" }, subjectId),
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Get("/available-schedules/:id")
  async getAvailableSchedules(@Param("id") courseId: string) {
    return await lastValueFrom(
      this.subjectService.send(
        {
          cmd: "get-available-shcedules",
        },
        { courseId },
      ),
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @Get("/average-subjects/:studentId")
  async getAverageSubjects(@Param("studentId") studentId: string) {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-average-by-student-and-subject" }, studentId),
    );
  }

  //para testear
  @Get()
  async findAll() {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-subjects" }, {}),
    );
  }
}
