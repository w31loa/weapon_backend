import { ObjectType, Field } from '@nestjs/graphql';
import { ProductDocumentModel } from './product-document';
import { ProductModel } from './product';
import { Product } from './product.model';
import { Document } from 'src/common/document/models/document.model';

@ObjectType()
export class ProductDocument extends ProductDocumentModel {
  @Field(() => Document, {nullable: true})
    Document?: Document;

  @Field(() => Product, { nullable: true })
    Product?: Product;
}
