import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserModel } from './user';
import { Basket } from 'src/basket/entities/basket.entity';


@ObjectType()
export class User extends UserModel {
  @Field(() => Basket , {nullable: true} )
  Basket?: Basket;
}
