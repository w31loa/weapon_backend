import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/product/models/product.model';
import { CategoryModel } from './category';

@ObjectType()
export class Category extends CategoryModel{
  @Field(()=>[Product])
  Product: Product[]
}
