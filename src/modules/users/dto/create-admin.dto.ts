import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(20)
  password: string;

  @IsEmail({}, { message: "Email must be valid" })
  @IsNotEmpty()
  email?: string;
}
