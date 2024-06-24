import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BasketService } from 'src/basket/basket.service';
import { Order } from './models/order.model';

@Injectable()
export class OrderService {

  constructor(private readonly prisma: PrismaService, private readonly basketService: BasketService) { }

  async create(userId: number): Promise<Order> {
    const basket = await this.basketService.getBasketByUserId(userId)

    const newOrder = await this.prisma.order.create({
      data: {
        basket_id: basket.id,
        user_id: userId
      }
    })

    if(newOrder){
      this.basketService.clearBasket(userId)
    }

    return newOrder
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
