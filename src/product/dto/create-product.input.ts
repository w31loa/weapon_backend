import { InputType, Int, Field } from '@nestjs/graphql';
import { Product } from '@prisma/client';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  
  @IsString()
  @Field(() => String)
  title: string;
 
  @IsString()
  @Field(() => String)
  description: string;
 
  @IsNumber()
  @Field(() => Int)
  price: number;
 
  @IsNumber()
  @Field(() => Int)
  magazine: number;
 
  @IsString()
  @Field(() => String)
  caliber: string;
 
  @IsNumber()
  @Field(() => Int)
  barrel_length: number;

  @IsNumber()
  @Field(() => Int)
  category_id: number;

  @IsString()
  @Field(()=> String)
  article : string

  @IsOptional()
  @IsArray()
  @Field(() => [Int], { nullable: true })
  document_ids: number[];
}
