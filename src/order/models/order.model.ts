import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrderModel } from './order';
import { User } from 'src/user/models/user.model';
import { Basket } from 'src/basket/models/basket.model';

@ObjectType()
export class Order  extends OrderModel{
  @Field(() => User, { nullable: true })
  User?:User

  @Field(() => Basket, { nullable: true })
  Basket?:Basket
}
