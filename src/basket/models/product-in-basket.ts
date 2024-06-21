import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProductsInBaket } from "@prisma/client";

@ObjectType()
export class ProductsInBasketModel implements ProductsInBaket {

    @Field(() => Int)
    basket_id: number;

    @Field(() => Int)
    product_id: number;

    @Field(() => Int)
    value: number;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;

    @Field(() => Date, { nullable: true })
    deleted_at: Date | null;

}