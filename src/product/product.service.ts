import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProductModel } from './models/product';
import { Product } from './models/product.model';

@Injectable()
export class ProductService {

  constructor(private readonly prisma:PrismaService){}

  async create(createProductInput: CreateProductInput):Promise<ProductModel> {

    const produstExist = await this.prisma.product.findFirst({
      where: {
        title: createProductInput.title
      }
    })

    if(produstExist){
      throw new BadRequestException('Product with this title exist')
    }

    return await this.prisma.product.create({
      data: createProductInput
    } 
    )
  }

  async findAll(skip?:number , take?:number, categoryId?: number):Promise<Product[]> {
    console.log({skip, take , categoryId})
    return await this.prisma.product.findMany({
      where: {category_id: categoryId},
      take,
      skip,
      include:{
        Category:true
      }
    });
  } 

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
