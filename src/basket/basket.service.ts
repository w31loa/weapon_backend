import { BadRequestException, Injectable } from '@nestjs/common';
import { AddProductToBasketInput } from './dto/create-basket.input';
import { UpdateBasketInput } from './dto/update-basket.input';
import { User } from 'src/user/models/user.model';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Basket } from './models/basket.model';
import { ProductsInBasket } from './models/product-in-basket.model';
import { Prisma } from '@prisma/client';
import { FindAllProductsInBasketOutput } from './dto/find-all-products-in-basket.output';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class BasketService {

  constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) { }

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
    return await this.prisma.productsInBaket.upsert({
      where: {
        product_id_basket_id: {
          basket_id: basket.id,
          product_id: productId,
        }
      },
      update: {
        deleted_at: null,
      },
      create: {
        basket_id: basket.id,
        product_id: productId,
      },
      include:{
        Product: {
          include: {
            ProductDocument: {
              where: {
                deleted_at: null,
              },
              include: {
                Document: true
              }
            }
          }
        }
      }
    })
  }

  async findAll(userId: number, skip?: number, take?: number): Promise<FindAllProductsInBasketOutput> {
    const where: Prisma.ProductsInBaketWhereInput = {
      Basket: {
        user_id: userId,
      }
    }

    const totalCount = await this.prisma.productsInBaket.count({ where })

    const receivedProductsInBasket = await this.prisma.productsInBaket.findMany({
      where,
      skip,
      take,
      include:{
        Product: {
          include: {
            ProductDocument: {
              where: {
                deleted_at: null,
              },
              include: {
                Document: true
              }
            },
          }
        }
      }
    });

    return {
      productsInBasket: receivedProductsInBasket,
      totalCount
    }
  }

  async update(userId: number, updateBasketInput: UpdateBasketInput): Promise<ProductsInBasket> {
    await this.prisma.productsInBaket.updateMany({
      where: {
        product_id: updateBasketInput.product_id,
        Basket: {
          user_id: userId
        }
      },
      data: {
        value: updateBasketInput.value
      },

    })

    return await this.prisma.productsInBaket.findFirst({
      where: {
        product_id: updateBasketInput.product_id,
        Basket: {
          user_id: userId
        }
      }
    })
  }

  async removeProductFromBasket(userId: number, product_id: number): Promise<ProductsInBasket> {
    const receivedProduct = await this.prisma.productsInBaket.findFirst({
      where: {
        product_id,
        Basket: {
          user_id: userId
        }
      }
    })

    if (!receivedProduct) {
      throw new BadRequestException('This product does not exist or was previously removed')
    }

    await this.prisma.productsInBaket.deleteMany({
      where: {
        product_id,
        Basket: {
          user_id: userId
        }
      }
    });

    return receivedProduct
  }

  async clearBasket(userId: number): Promise<ProductsInBasket[]> {
    const receivedProducts = await this.prisma.productsInBaket.findMany({
      where: {
        Basket: {
          user_id: userId
        }
      }
    })

    await this.prisma.productsInBaket.deleteMany({
      where: {
        Basket: {
          user_id: userId
        }
      }
    })

    return receivedProducts

  }

  async getBasketByUserId(userId: number): Promise<Basket> {
    return await this.prisma.basket.findFirst({
      where: {
        user_id: userId 
      }
    })
  }
}
