import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Length(4, 50)
  @Field(() => String)
  login: string;

  @IsEmail()
  @Field(() => String)
  email: string

  @IsString()
  @Length(4, 100)
  @Field(() => String)
  password: string;

}
