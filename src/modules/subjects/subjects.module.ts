import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { CoursesController } from './courses.controller';
import { EvaluationsController } from './evaluations.controller';
import { GradesController } from './grades.controller';
import { InscriptionsController } from './inscriptions.controller';
import { SchedulesController } from './schedules.controller';
import { ReportsController } from './reports.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SUBJECTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://mfivcrgg:3zQWvCAEyg_q0a7QS7m7e-whP-jp4pYL@prawn.rmq.cloudamqp.com/mfivcrgg'],
          queue: 'subjects_queue', 
          queueOptions: {
            durable: false
          }
        }
      }
    ])
  ],
  controllers: [
    SubjectsController,
    CoursesController,
    EvaluationsController,
    GradesController,
    InscriptionsController,
    SchedulesController,
    ReportsController,
  ],
  providers: [JwtService],
})
export class SubjectsModule {}
