import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './models/order.model';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { CurrentUser } from 'src/common/decorators/user.decorator.graphql';
import { IPayload } from 'src/common/interfaces/payload.interface';
import { GqlJwtAuthGuard } from 'src/common/guards/gql-jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Order)
  createOrder(@CurrentUser() user:IPayload):Promise<Order> {
    return this.orderService.create(user.id);
  }

  @Query(() => [Order], { name: 'order' })
  findAll() {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.remove(id);
  }
}
