import { Controller, Get, Query, Inject, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/role.decorator";
import { UserRole } from "src/common/enums/roles.enum";

@Controller("percentages")
export class PercentagesController {
  constructor(
    @Inject("ATTENDANCE_SERVICE")
    private readonly percentagesClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Get("by-student-course")
  async getAttendancePercentage(
    @Query("studentId") studentId: string,
    @Query("courseId") courseId: string,
  ) {
    return await lastValueFrom(
      this.percentagesClient.send(
        { cmd: "get-attendance-percentage" },
        { studentId, courseId },
      ),
    );
  }
}
