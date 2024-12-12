import { 
    IsEnum,
    IsNotEmpty, 
    IsNumber,
    IsString,
    Matches, 
} from "class-validator";
import { IsCourseName } from "src/common/decorators/course-validator.decorator";
import { EducationalLevel } from "src/common/enums/educational-level.enum";

export class CreateCourseDto {
    @IsCourseName({message: 'El nombre del curso debe ser un valor entre 1° y 8°.'})
    @IsNotEmpty()
    name?: string;

    @IsEnum(EducationalLevel)
    @IsNotEmpty()
    educationalLevel?: string;

    @IsNumber()
    @IsNotEmpty()
    year?: number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Z]$/)
    letter?: string;
}
