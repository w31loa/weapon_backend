import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ProductsInBasket } from "../models/product-in-basket.model";

@ObjectType()
export class FindAllProductsInBasketOutput {

    @Field(()=> [ProductsInBasket] , {nullable: true})
    productsInBasket: ProductsInBasket[];

    @Field(()=> Int )
    totalCount: number;
    
}