import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductModel } from './product';
import { Category } from 'src/category/models/category.model';

@ObjectType()
export class Product extends ProductModel {
  @Field(() => Category)
  Category: Category;

}
