import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductDocument } from '@prisma/client';

@ObjectType()
export class ProductDocumentModel implements ProductDocument {
  @Field(() => Int)
    product_id: number;

  @Field(() => Int)
    document_id: number;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}
