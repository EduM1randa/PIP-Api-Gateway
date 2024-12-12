import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { MongoId, ValidEmail } from "./dto/id-email.dto";
import { lastValueFrom } from "rxjs";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { UserRole } from "src/common/enums/roles.enum";
import { RelateParentStudentDto } from "./dto/relate-parent-student.dto";

@Controller("admin")
export class AdminController {
  constructor(@Inject("USER_SERVICE") private readonly msUsers: ClientProxy) {}

  //    SOLICITUDES CREATE
  @Post("/create")
  async create(@Body() createAdminDto: CreateAdminDto) {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "create-admin" }, createAdminDto),
    );
  }

  @Post("/login")
  async signIn(@Body() signInDto: SignInDto) {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "admin-login" }, signInDto),
    );
  }

  @Post("/relate-parent-student")
  async relatePS(@Body() familyId: RelateParentStudentDto) {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "relate-parent-student" }, familyId),
    );
  }

  //    SOLICITUDES GET
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get("/find-all")
  async obtainAllAdmins() {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "get-all-admins" }, ""),
    );
  }

  @Get("/findall")
  async findAllAdmin() {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "get-all-admins" }, ""),
    );
  }

  @Get("/obtain-by-email")
  async obtainByEmail(@Query() query: ValidEmail) {
    const { email } = query;
    return await lastValueFrom(
      this.msUsers.send({ cmd: "get-by-email" }, email),
    );
  }

  @Get("/obtain-by-id")
  async obtainByID(@Query() query: MongoId) {
    const { id } = query;
    return await lastValueFrom(this.msUsers.send({ cmd: "get-by-id" }, id));
  }

  //    SOLICITUDES DELETE
  @Delete("/delete-by-email")
  async deleteByEmail(@Query() query: ValidEmail) {
    const { email } = query;
    return await lastValueFrom(
      this.msUsers.send({ cmd: "delete-admin-by-email" }, email),
    );
  }

  //    SOLICITUDES TEST
  @Get("/test-error")
  async testError() {
    try {
      return await lastValueFrom(this.msUsers.send({ cmd: "get-error" }, ""));
    } catch (error) {
      throw new BadRequestException(
        error.message || "Error inesperado en el servidor",
      );
    }
  }
}
