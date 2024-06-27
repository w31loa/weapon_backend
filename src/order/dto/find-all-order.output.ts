import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Order } from "../models/order.model";

@ObjectType()
export class FindAllOrdersOutput {

    @Field(()=> [Order] , {nullable: true})
    orders: Order[];

    @Field(()=> Int )
    totalCount: number;
    
}