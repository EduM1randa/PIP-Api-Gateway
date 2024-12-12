import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import { InscriptionStatus } from "src/common/enums/inscription-status.enum";

export class UpdateInscriptionDto {
  @IsMongoId()
  @IsOptional()
  courseId?: string;

  @IsMongoId()
  @IsOptional()
  electiveId?: string;

  @IsEnum(InscriptionStatus)
  @IsOptional()
  status?: InscriptionStatus;

  @IsDate()
  @IsNotEmpty()
  updatedAt?: Date;
}
