import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from '@prisma/client';


@ObjectType()
export class UserModel implements User {
    @Field(() => Int)
    id: number
    
    @Field(() => String)
    login: string
    
    @Field(() => String)
    email: string

    @Field(() => String)
    password: string

    @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}