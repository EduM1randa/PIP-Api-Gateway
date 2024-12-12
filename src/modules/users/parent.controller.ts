// parent.controller.ts
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
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateParentDto } from "./dto/create-parent.dto";
import { lastValueFrom } from "rxjs";
import { AuthGuard } from "src/common/guards/auth.guard";
import { SignInDto } from "./dto/sign-in.dto";
import { MongoId, ValidEmail } from "./dto/id-email.dto";
import { query } from "express";

@Controller("parent")
export class ParentController {
  constructor(@Inject("USER_SERVICE") private readonly msUsers: ClientProxy) {}

  //    SOLICITUDES CREATE
  @Post("/create")
  async create(@Body() createParentDto: CreateParentDto) {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "create-parent" }, createParentDto),
    );
  }

  @Post("/login")
  async signIn(@Body() singInDto: SignInDto) {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "parent-login" }, singInDto),
    );
  }

  //    SOLICITUDES GET
  @UseGuards(AuthGuard)
  @Get("/find-all")
  async obtainAllParents() {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "find-all-parents" }, ""),
    );
  }

  @Get("/obtain-parent-info")
  async obtainParentInfo() {
    return await lastValueFrom(
      this.msUsers.send({ cmd: "obtain-parents-minimun-info" }, ""),
    );
  }

  @UseGuards(AuthGuard)
  @Get("/obtain-parent-children") //Esta Req en un futuro, buscará los hijos a través de las ID retornadas
  async obtainChildrenFromParent(@Req() req: Request) {
    const parentID = req["user"].sub;

    if (!parentID) {
      throw new BadRequestException("Parent ID is missing in request");
    }
    return await lastValueFrom(
      this.msUsers.send({ cmd: "obtain-parent-childrens" }, parentID),
    );
  }

  @Get("/obtain-by-email")
  async obtainByEmail(@Query() query: ValidEmail) {
    const { email } = query;
    return await lastValueFrom(
      this.msUsers.send({ cmd: "get-parent-by-email" }, email),
    );
  }

  @Get("/obtain-by-id")
  async obtainByID(@Query() query: MongoId) {
    const { id } = query;
    return await lastValueFrom(
      this.msUsers.send({ cmd: "get-parent-by-id" }, id),
    );
  }

  //    SOLICITUDES DELETE
  @Delete("/delete-by-email")
  async deleteByEmail(@Query() query: ValidEmail) {
    const { email } = query;
    return await lastValueFrom(
      this.msUsers.send({ cmd: "delete-parent-by-email" }, email),
    );
  }

  //    SOLICITUDES UPDATE
  //    ¿PROXIMAMENTE?
}
