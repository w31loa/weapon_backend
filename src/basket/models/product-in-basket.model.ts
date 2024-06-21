import { Field, ObjectType } from "@nestjs/graphql";
import { ProductsInBasketModel } from "./product-in-basket";
import { Basket } from "./basket.model";
import { Product } from "src/product/models/product.model";

@ObjectType()
export class ProductsInBasket extends ProductsInBasketModel {

    @Field(() => Basket, { nullable: true })
    Basket?: Basket

    @Field(() => Product, { nullable: true })
    Product?: Product

}