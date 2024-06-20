import { Field, Int, ObjectType } from "@nestjs/graphql";
// import { Document } from "@prisma/client";

@ObjectType()
export class Document  {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    url: string;

    @Field(() => String)
    name: string;

    @Field(() => Int, { nullable: true })
    size?: number

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;

    @Field(() => Date, { nullable: true })
    deleted_at?: Date | null;
}