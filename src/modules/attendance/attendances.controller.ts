import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { lastValueFrom } from 'rxjs';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/common/enums/roles.enum';

@Controller('attendance')
export class AttendancesController {
  constructor(@Inject('ATTENDANCE_SERVICE') private readonly attendanceClient: ClientProxy) {}

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Post('/create')
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return await lastValueFrom(
      this.attendanceClient.send({ cmd: 'create-attendance' }, createAttendanceDto),
    );
  }

  // Para testear
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await lastValueFrom(
      this.attendanceClient.send({ cmd: 'get-attendances' }, {}),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await lastValueFrom(
      this.attendanceClient.send({ cmd: 'get-att-by-id' }, id),
    );
  }

  @UseGuards(AuthGuard)
  @Get('/by-day/:date')
  async findByDay(@Param('date') date: string) {
    return await lastValueFrom(
      this.attendanceClient.send({ cmd: 'get-att-by-day' }, date),
    );
  }

  @UseGuards(AuthGuard)
  @Get('/by-student-date')
  async findByStudentAndDate(
    @Query('studentId') studentId: string,
    @Query('date') date: string,
  ) {
    return await lastValueFrom(
      this.attendanceClient.send(
        { cmd: 'get-by-student-date' },
        { studentId, date },
      ),
    );
  }
}