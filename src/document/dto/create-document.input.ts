import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateDocumentInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  url: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNumber()
  @Field(() => Int, {nullable: true})
  size?: number;

}
