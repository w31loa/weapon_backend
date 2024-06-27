import {
    Field, InputType, Int, PartialType,
  } from '@nestjs/graphql';
  import { IsNotEmpty, IsNumber } from 'class-validator';
  import { CreateDocumentInput } from './create-document.input';
  
  @InputType()
  export class UpdateDocumentInput extends PartialType(CreateDocumentInput) {
    @IsNotEmpty()
    @IsNumber()
    @Field(() => Int)
      id: number;
  }
  