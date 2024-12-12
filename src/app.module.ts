import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from "@nestjs/jwt";
import { SubjectsModule } from './modules/subjects/subjects.module';
import { AttendancesModule } from './modules/attendance/attendances.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '60m' }, 
    }),
    SubjectsModule,
    AttendancesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
