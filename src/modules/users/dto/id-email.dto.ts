import { IsEmail, IsMongoId } from "class-validator";

export class MongoId {
  @IsMongoId()
  id: string;
}

export class ValidEmail {
    @IsEmail()
    email: string;
}
