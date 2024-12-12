import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CreateStudentDto } from "./dto/create-student.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { UserRole } from "src/common/enums/roles.enum";

@Controller("students")
export class StudentsController {
  constructor(
    @Inject("USER_SERVICE") private readonly userService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @Post("/create")
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    console.log("createStudentDto", createStudentDto);
    return await lastValueFrom(
      this.userService.send({ cmd: "create-student" }, createStudentDto),
    ); 
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async getStudentById(@Param("id") id: string) {
    return await lastValueFrom(
      this.userService.send({ cmd: "get-student" }, id),
    );
  }

  // Para probar la conexión
  @Get()
  async getStudents() {
    return await lastValueFrom(
      this.userService.send({ cmd: "get-students" }, {}),
    );
  }

  @UseGuards(AuthGuard)
  @Get("medical-observations/:studentId")
  async getMedicalObservations(@Param("studentId") studentId: string) {
    return await lastValueFrom(
      this.userService.send({ cmd: "get-medical-observations" }, studentId),
    );
  }

}
