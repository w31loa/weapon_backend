import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductModel } from './product';
import { Category } from 'src/category/models/category.model';
import { ProductDocument } from './product-document.model';

@ObjectType()
export class Product extends ProductModel {
  @Field(() => Category, { nullable: true }) //нулабл тру
  Category?: Category;

  @Field(() => [ProductDocument], { nullable: true })
  ProductDocument?: ProductDocument[];

}
