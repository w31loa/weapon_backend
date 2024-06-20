import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BasketService } from './basket.service';
import { Basket } from './entities/basket.entity';
import { CreateBasketInput } from './dto/create-basket.input';
import { UpdateBasketInput } from './dto/update-basket.input';

@Resolver(() => Basket)
export class BasketResolver {
  constructor(private readonly basketService: BasketService) {}

  @Mutation(() => Basket)
  createBasket(@Args('createBasketInput') createBasketInput: CreateBasketInput) {
    return this.basketService.create(createBasketInput);
  }

  @Query(() => [Basket], { name: 'basket' })
  findAll() {
    return this.basketService.findAll();
  }

  @Query(() => Basket, { name: 'basket' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.basketService.findOne(id);
  }

  @Mutation(() => Basket)
  updateBasket(@Args('updateBasketInput') updateBasketInput: UpdateBasketInput) {
    return this.basketService.update(updateBasketInput.id, updateBasketInput);
  }

  @Mutation(() => Basket)
  removeBasket(@Args('id', { type: () => Int }) id: number) {
    return this.basketService.remove(id);
  }
}
