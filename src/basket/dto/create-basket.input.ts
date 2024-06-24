import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class AddProductToBasketInput {
  @IsNumber()
  @Field(() => Int)
  productId: number;
}
