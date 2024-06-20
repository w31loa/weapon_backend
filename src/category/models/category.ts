import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Catecory } from '@prisma/client';

@ObjectType()
export class CategoryModel implements Catecory{
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

 

  @Field(() => Date)
  created_at: Date;

@Field(() => Date)
  updated_at: Date;

@Field(() => Date, { nullable: true })
  deleted_at: Date | null;
}
