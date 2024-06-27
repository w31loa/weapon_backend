import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Category } from "../models/category.model";

@ObjectType()
export class FindAllCategoriesOutput {

    @Field(()=> [Category] , {nullable: true})
    categories: Category[];

    @Field(()=> Int )
    totalCount: number;
    
}