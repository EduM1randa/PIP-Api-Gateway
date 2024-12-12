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
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { UserRole } from "src/common/enums/roles.enum";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";

@Controller("grades")
export class GradesController {
  constructor(
    @Inject("SUBJECTS_SERVICE") private readonly subjectService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Post("/create")
  async create(@Body() createGradeDto: CreateGradeDto) {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "create-grade" }, createGradeDto),
    );
  }

  // Para probar la conexión y funcionamiento del create
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-all-grades" }, {}),
    );
  }

  @UseGuards(AuthGuard)
  @Get(":studentId")
  async findByStudent(@Param("studentId") studentId: string) {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-grade-by-id" }, studentId),
    );
  }

  @UseGuards(AuthGuard)
  @Get("get-by-evaluation/:evaluationId")
  async findByEvaluation(@Param("evaluationId") evaluationId: string) {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-grades-by-evaluation" }, evaluationId),
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateGradeDto: UpdateGradeDto,
  ) {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "update-grade" }, { id, updateGradeDto }),
    );
  }
}
