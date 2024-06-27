import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BasketService } from 'src/basket/basket.service';
import { Order } from './models/order.model';
import { Prisma } from '@prisma/client';
import { FindAllOrdersOutput } from './dto/find-all-order.output';
import { MailService } from 'src/common/mail/mail.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OrderService {

  constructor(private readonly prisma: PrismaService, private readonly basketService: BasketService, private readonly mailService: MailService, private readonly userService: UserService) { }

  async create(userId: number): Promise<Order> {
    const basket = await this.basketService.getBasketByUserId(userId)
    const user = await this.userService.findOne(userId)
    const newOrder = await this.prisma.order.create({
      data: {
        basket_id: basket.id,
        user_id: userId
      }
    })

    if (newOrder) {
      await this.mailService.sendNewOrderEmail(newOrder, user)
      await this.basketService.clearBasket(userId)
    }

    return newOrder
  }

  async findAll(skip?: number, take?: number): Promise<FindAllOrdersOutput> {
    const recivedOrders = await this.prisma.order.findMany({
      skip,
      take
    })

    const totalCount = await this.prisma.order.count()
    return {
      orders: recivedOrders,
      totalCount
    }
  }

  async findOne(id: number): Promise<Order> {
    const receivedOrder = await this.prisma.order.findFirst({
      where: { id }
    })

    if (!receivedOrder) {
      throw new NotFoundException()
    }
    return receivedOrder;
  }

  async update(id: number, updateOrderInput: UpdateOrderInput): Promise<Order | null> {
    await this.prisma.order.update({
      where: { id },
      data: updateOrderInput
    })
    return this.findOne(id)
  }

  async remove(id: number): Promise<Order> {
    return await this.prisma.order.delete({
      where: { id }
    })
  }
}
