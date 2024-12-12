import { IsDate, IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { InscriptionStatus } from 'src/common/enums/inscription-status.enum';
import { InscriptionType } from 'src/common/enums/inscription-type.enum';

export class CreateInscriptionDto {
  @IsMongoId()
  @IsNotEmpty()
  studentId?: string;

  @IsMongoId()
  @IsOptional()
  courseId?: string;

  @IsMongoId()
  @IsOptional()
  electiveId?: string;

  @IsEnum(InscriptionStatus)
  @IsNotEmpty()
  status?: InscriptionStatus;

  @IsEnum(InscriptionType)
  @IsNotEmpty()
  type?: InscriptionType;
}