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
import { FindAllProductsInBasketOutput } from './dto/find-all-products-in-basket.output';

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
  @Query(() => FindAllProductsInBasketOutput, { name: 'basketForUser' })
  findAll(
    @CurrentUser() user: IPayload,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number
    ): Promise<FindAllProductsInBasketOutput> {
    return this.basketService.findAll(user.id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => ProductsInBasket, { name: 'changeProductValueInBasket' })
  updateBasket(
    @Args('updateBasketInput') updateBasketInput: UpdateBasketInput,
    @CurrentUser() user: IPayload
  ): Promise<ProductsInBasket> {
    return this.basketService.update(user.id, updateBasketInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => ProductsInBasket, { name: 'removeProductFromBasket' })
  removeProductFromBasket(
    @Args('product_id', { type: () => Int }) product_id: number,
    @CurrentUser() user: IPayload
  ): Promise<ProductsInBasket> {
    return this.basketService.removeProductFromBasket(user.id, product_id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => [ProductsInBasket], { name: 'clearBasket' })
  clearBasket(
    @CurrentUser() user: IPayload
  ): Promise<ProductsInBasket[]> {
    return this.basketService.clearBasket(user.id);
  }
} 
