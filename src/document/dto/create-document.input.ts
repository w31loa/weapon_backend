import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

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

}
