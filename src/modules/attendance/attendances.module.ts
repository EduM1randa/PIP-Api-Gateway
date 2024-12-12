import { Module } from "@nestjs/common";
import { AttendancesController } from "./attendances.controller";
import { JwtService } from "@nestjs/jwt";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AssistsController } from "./assists.controller";
import { JustificationsController } from "./justifications.controller";
import { PercentagesController } from "./percentages.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "ATTENDANCE_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [
            "amqps://lqbucdmb:3YcHZZON5ZD-szJXXfvKX0wCC1YZVkAZ@prawn.rmq.cloudamqp.com/lqbucdmb",
          ],
          queue: "attendance_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [
    AttendancesController,
    AssistsController,
    JustificationsController,
    PercentagesController,
  ],
  providers: [JwtService],
})
export class AttendancesModule {}
