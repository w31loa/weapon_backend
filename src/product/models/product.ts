import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '@prisma/client';

@ObjectType()
export class ProductModel implements Product{
  @Field(() => Int)
  id: number;
 
  @Field(() => String)
  title: string;
 
  @Field(() => String)
  description: string;
 
  @Field(() => Int)
  price: number;
 
  @Field(() => Int)
  magazine: number;
 
  @Field(() => String)
  caliber: string;
 
  @Field(() => Int)
  barrel_length: number;

  @Field(() => Int)
  category_id: number;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;
 
  
}
