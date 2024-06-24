import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BasketService } from './basket.service';
import { Basket } from './models/basket.model';
import { AddProductToBasketInput } from './dto/create-basket.input';
import { UpdateBasketInput } from './dto/update-basket.input';
import { CurrentUser } from 'src/common/decorators/user.decorator.graphql';
import { User } from 'src/user/models/user.model';
import { GqlJwtAuthGuard } from 'src/common/guards/gql-jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { IPayload } from 'src/common/interfaces/payload.interface';
import { ProductsInBasket } from './models/product-in-basket.model';

@Resolver(() => Basket)
export class BasketResolver {
  constructor(private readonly basketService: BasketService) { }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => ProductsInBasket)
  addProductToBasket(
    @Args('addProductToBasketInput') addProductToBasketInput: AddProductToBasketInput,
    @CurrentUser() user: IPayload
  ): Promise<ProductsInBasket> {
    return this.basketService.addProductInBasket(user.id, addProductToBasketInput.productId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [ProductsInBasket], { name: 'basketForUser' })
  findAll(@CurrentUser() user: IPayload): Promise<ProductsInBasket[]> {
    return this.basketService.findAll(user.id);
  } 

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => ProductsInBasket, { name: 'changeProductValueInBasket' }) 
  updateBasket(
    @Args('updateBasketInput') updateBasketInput: UpdateBasketInput,
    @CurrentUser() user: IPayload
    ) {
    return this.basketService.update(user.id , updateBasketInput);
  }

  @Mutation(() => Basket)
  removeBasket(@Args('id', { type: () => Int }) id: number) {
    return this.basketService.remove(id);
  }
}
