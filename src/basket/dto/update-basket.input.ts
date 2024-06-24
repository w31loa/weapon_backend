import { IsNumber } from 'class-validator';
import { AddProductToBasketInput } from './create-basket.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBasketInput  {
  
  @IsNumber()
  @Field(()=> Int)
  product_id: number

  @IsNumber()
  @Field(()=> Int)
  value: number
}
