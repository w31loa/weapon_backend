import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Order } from "@prisma/client";

@ObjectType()
export class OrderModel implements Order {

    @Field(() => Int)
    id: number

    @Field(() => Int)
    user_id: number

    @Field(() => Int)
    basket_id: number

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;

    @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}