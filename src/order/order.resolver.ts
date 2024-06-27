import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './models/order.model';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { CurrentUser } from 'src/common/decorators/user.decorator.graphql';
import { IPayload } from 'src/common/interfaces/payload.interface';
import { GqlJwtAuthGuard } from 'src/common/guards/gql-jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { FindAllOrdersOutput } from './dto/find-all-order.output';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) { }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Order)
  createOrder(@CurrentUser() user: IPayload): Promise<Order> {
    return this.orderService.create(user.id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => FindAllOrdersOutput, { name: 'orders' })
  findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number, 
  ): Promise<FindAllOrdersOutput>  {
    return this.orderService.findAll();
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput): Promise<Order> {
    return this.orderService.update(updateOrderInput.id, updateOrderInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => Int }) id: number): Promise<Order> {
    return this.orderService.remove(id);
  }
}
