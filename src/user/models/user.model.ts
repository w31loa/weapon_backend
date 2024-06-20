import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserModel } from './user';


@ObjectType()
export class User extends UserModel {
  // @Field(() => Basket)
  // exampleField: number;
}
