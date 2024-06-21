import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Basket } from "@prisma/client";

@ObjectType()
export class BasketModel implements Basket {

    @Field(() => Int)
    id: number

    @Field(() => Int)
    user_id: number

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;

    @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}