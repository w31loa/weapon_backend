import { BadRequestException, Injectable } from '@nestjs/common';
import { AddProductToBasketInput } from './dto/create-basket.input';
import { UpdateBasketInput } from './dto/update-basket.input';
import { User } from 'src/user/models/user.model';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Basket } from './models/basket.model';
import { ProductsInBasket } from './models/product-in-basket.model';

@Injectable()
export class BasketService {
  // create(createBasketInput: CreateBasketInput) {
  //   return 'This action adds a new basket';
  // }

  constructor(private readonly prisma: PrismaService) { }

  async addProductInBasket(userId: number, productId: number): Promise<ProductsInBasket> {

    const product = await this.prisma.product.findFirst({
      where: {
        id: productId
      }
    })

    if (!product) {
      throw new BadRequestException('Product does not exist')
    }

    const basket = await this.getBasketByUserId(userId)
    return await this.prisma.productsInBaket.create({
      data: {
        basket_id: basket.id,
        product_id: productId,
      }
    })
  }

  async findAll(userId: number): Promise<ProductsInBasket[]> {
    const basket = await this.getBasketByUserId(userId)
    return await this.prisma.productsInBaket.findMany({
      where:{
        basket_id: basket.user_id
      },
    });
  }



  async update(userId: number, updateBasketInput: UpdateBasketInput) {
    const basket = await this.getBasketByUserId(userId)
    return this.prisma.productsInBaket.updateMany({
     where:{
      basket_id: basket.id
     },
      data: {
        product_id: updateBasketInput.product_id,
        value: updateBasketInput.value
      },
     
    })
    
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }

  async getBasketByUserId(userId: number): Promise<Basket> {
    return await this.prisma.basket.findFirst({
      where: {
        user_id: userId
      }
    })
  }
}
