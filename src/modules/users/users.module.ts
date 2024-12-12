import { Module } from "@nestjs/common";
import { Transport, ClientsModule } from "@nestjs/microservices";
import { JwtService } from "@nestjs/jwt";
import { ParentController } from "./parent.controller";
import { TeacherController } from "./teacher.controller";
import { StudentsController } from "./students.controller";
import { AdminController } from "./admin.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [
            "amqps://rvewvxvp:NGhEBlSHgBKMlYnp7AucxIUyk4lvpbV4@jackal.rmq.cloudamqp.com/rvewvxvp",
          ],
          queue: "users_queue",
          queueOptions: {
            durable: false,
          },
        },  
      },
    ]),
  ],
  controllers: [
    AdminController,
    ParentController,
    TeacherController,
    StudentsController,
  ],
  providers: [JwtService],
})
export class UsersModule {}
