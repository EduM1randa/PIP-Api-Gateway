import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  IsDateString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsPhoneNumber,
} from "class-validator";

export class CreateParentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @Matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, {
    message: "First Name Must Be Alphabetical",
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @Matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, {
    message: "Last Name Must Be Alphabetical",
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @MaxLength(20)
  password: string;

  @IsEmail({}, { message: "Email must be valid" })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("CL")
  phone: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  childrens?: string[];

  @IsString()
  @IsOptional()
  resetPasswordToken?: string;

  @IsDateString()
  @IsOptional()
  resetPasswordExpires?: Date;
}
