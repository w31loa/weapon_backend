import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Product } from "../models/product.model";

@ObjectType()
export class FindAllProductsOutput {

    @Field(()=> [Product] , {nullable: true})
    products: Product[];

    @Field(()=> Int )
    totalCount: number;
    
}