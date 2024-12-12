import { Controller, Get, Inject, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Controller("reports")
export class ReportsController {
  constructor(
    @Inject("SUBJECTS_SERVICE") private readonly subjectService: ClientProxy,
  ) {}

  @Get('/:studentId/:year')
  async getReporte(
    @Res() res: Response,
    @Param('studentId') studentId: string,
    @Param('year') year: number,
  ) {
    const base64String = await lastValueFrom(
      this.subjectService.send<string>({ cmd: 'get-report' }, {studentId, year}),
    );

    const buffer = Buffer.from(base64String, 'base64');

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
