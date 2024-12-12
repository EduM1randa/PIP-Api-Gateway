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
import { CreateEvaluationDto } from "./dto/create-evaluation.dto";
import { UpdateEvaluationDto } from "./dto/update-evaluation.dto";

@Controller("evaluations")
export class EvaluationsController {
  constructor(
    @Inject("SUBJECTS_SERVICE")
    private readonly subjectService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Post("/create")
  async create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return await lastValueFrom(
      this.subjectService.send(
        { cmd: "create-evaluation" },
        createEvaluationDto,
      ),
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return await lastValueFrom(
      this.subjectService.send(
        { cmd: "update-evaluation" },
        { id, updateEvaluationDto },
      ),
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-all-evaluations" }, {}),
    );
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-evaluation-by-id" }, id),
    );
  }

  @UseGuards(AuthGuard)
  @Get("/by-subject/:subjectId")
  async findBySubject(@Param("subjectId") subjectId: string) {
    return await lastValueFrom(
      this.subjectService.send(
        { cmd: "find-evaluations-by-subject" },
        subjectId,
      ),
    );
  }
}
