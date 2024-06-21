import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BasketModel } from './basket';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class Basket extends BasketModel{
  @Field(() => User , {nullable : true})
  User?: User;
}
