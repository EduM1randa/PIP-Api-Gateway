import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { AuthGuard } from "src/common/guards/auth.guard";

@Controller("schedules")
export class SchedulesController {
  constructor(
    @Inject("SUBJECTS_SERVICE") private readonly subjectService: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Get("/blocks")
  async getBlocks() {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-blocks" }, {}),
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async getSchedules() {
    return await lastValueFrom(
      this.subjectService.send({ cmd: "get-schedules" }, {}),
    );
  }
}
