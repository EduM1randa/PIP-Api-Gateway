import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Inject,
  UseGuards,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateJustificationDto } from "./dto/create-justification.dto";
import { lastValueFrom } from "rxjs";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { UserRole } from "src/common/enums/roles.enum";

@Controller("justifications")
export class JustificationsController {
  constructor(
    @Inject("ATTENDANCE_SERVICE")
    private readonly justificationsClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Post('/create')
  async create(@Body() createJustificationDto: CreateJustificationDto) {
    return await lastValueFrom(
      this.justificationsClient.send(
        { cmd: "create-justification" },
        createJustificationDto,
      ),
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await lastValueFrom(
      this.justificationsClient.send({ cmd: "findAll-justifications" }, {}),
    );
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await lastValueFrom(
      this.justificationsClient.send({ cmd: "get-by-id" }, id),
    );
  }

  @UseGuards(AuthGuard)
  @Get("by-attendance/:attendanceId")
  async findByAttendance(@Param("attendanceId") attendanceId: string) {
    return await lastValueFrom(
      this.justificationsClient.send(
        { cmd: "get-by-attendance" },
        attendanceId,
      ),
    );
  }

  @UseGuards(AuthGuard)
  @Get("by-student/:studentId")
  async findByStudent(@Param("studentId") studentId: string) {
    return await lastValueFrom(
      this.justificationsClient.send({ cmd: "get-by-student" }, studentId),
    );
  }
}
