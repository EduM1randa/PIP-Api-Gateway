// teacher.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { lastValueFrom } from "rxjs";
import { AuthGuard } from "src/common/guards/auth.guard";
import { SignInDto } from "./dto/sign-in.dto";
import { MongoId, ValidEmail } from "./dto/id-email.dto";

@Controller("teacher")
export class TeacherController {
  constructor(@Inject("USER_SERVICE") private readonly msUsers: ClientProxy) {}

  //    SOLICITUDES CREATE
  @Post("/create")
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "create-teacher" }, createTeacherDto),
    );
  }

  @Post("/login")
  async signIn(@Body() singInDto: SignInDto) {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "teacher-login" }, singInDto),
    );
  }

  //    SOLICITUDES GET
  @UseGuards(AuthGuard)
  @Get("/find-all")
  async obtainAllTeacher() {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "find-all-teachers" }, ""),
    );
  }

  @Get("/obtain-teacher-info")
  async obtainTeacherInfo() {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "obtain-teachers-minimun-info" }, ""),
    );
  }

  @UseGuards(AuthGuard)
  @Get("/obtain-teacher-subject") //Esta Req en un futuro, buscará las asignaturas a través de las ID retornadas
  async obtainSubjectsFromTeacher(@Req() req: Request) {
    const teacherID = req["user"].sub;

    if (!teacherID) {
      throw new BadRequestException("Teacher ID is missing in request");
    }

    return await lastValueFrom(
      this.msUsers.send({ cmd: "obtain-teacher-subjects" }, teacherID),
    );
  }

  @Get("/obtain-by-email")
  async obtainByEmail(@Query() query: ValidEmail) {
    const { email } = query;  
    return await lastValueFrom(
      this.msUsers.send({ cmd: "get-teacher-by-email" }, email),
    );
  }

  @Get("/obtain-by-id/:id")
  async obtainByID(@Param("id") id: string) {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "get-teacher-by-id" }, id)
    );
  }

  //    SOLICITUDES DELETE
  @Delete("/delete-by-email")
  async deletebyEmail(@Query() query: ValidEmail) {
    const { email } = query;
    return await lastValueFrom(
      this.msUsers.send({ cmd: "delete-teacher-by-email" }, email),
    );
  }

  //    SOLICITUDES UPDATE
  //    ¿PROXIMAMENTE?
}
