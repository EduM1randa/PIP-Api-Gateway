import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAssistDto } from './dto/create-assist.dto';
import { lastValueFrom } from 'rxjs';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/common/enums/roles.enum';

@Controller('assists')
export class AssistsController {
  constructor(@Inject('ATTENDANCE_SERVICE') private readonly assistsClient: ClientProxy) {}

  @UseGuards(AuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @Post('/create')
  async create(@Body() createAssistDto: CreateAssistDto) {
    return await lastValueFrom(
      this.assistsClient.send({ cmd: 'create-assists' }, createAssistDto),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await lastValueFrom(
      this.assistsClient.send({ cmd: 'get-assist' }, id),
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await lastValueFrom(
      this.assistsClient.send({ cmd: 'get-assists' }, {}),
    );
  }
}