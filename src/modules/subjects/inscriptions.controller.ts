import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Inject,
  UseGuards,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { UserRole } from "src/common/enums/roles.enum";
import { CreateInscriptionDto } from "./dto/create-inscription.dto";
import { UpdateInscriptionDto } from "./dto/update-inscription.dto";

@Controller("inscriptions")
export class InscriptionsController {
  constructor(
    @Inject("SUBJECTS_SERVICE")
    private readonly subjectService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @Post("/create")
  async create(@Body() createInscriptionDto: CreateInscriptionDto) {
    return await lastValueFrom(
      this.subjectService.send(
        { cmd: "create-inscription" },
        createInscriptionDto,
      ),
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-all-inscriptions" }, {}),
    );
  }

  @UseGuards(AuthGuard)
  @Get("student/:studentId/course/:courseId")
  async findInscription(
    @Param("studentId") studentId: string,
    @Param("courseId") courseId: string,
  ) {
    return await lastValueFrom(
      this.subjectService.send(
        { cmd: "get-inscription-by-student-and-course" },
        { studentId, courseId },
      ),
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateInscriptionDto: UpdateInscriptionDto,
  ) {
    return await lastValueFrom(
      this.subjectService.send(
        { cmd: "update-inscription" },
        { id, updateInscriptionDto },
      ),
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @Get("students-by-course/:courseId")
  async getStudentsByCourse(@Param("courseId") courseId: string) {
    return await lastValueFrom(
      this.subjectService.send(
        { cmd: "get-students-by-course" },
        courseId,
      ),
    );
  }
}
