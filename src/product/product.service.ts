import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProductModel } from './models/product';
import { Product } from './models/product.model';
import { Prisma } from '@prisma/client';
import { FindAllProductsOutput } from './dto/find-all-products.output';

@Injectable()
export class ProductService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const arrayOfProductDocuments: Prisma.ProductDocumentCreateManyProductInput[] = [];
    const { document_ids, ...createProductData } = createProductInput;

    const produstTitleExist = await this.prisma.product.findFirst({
      where: {
        title: createProductData.title,
      }
    })
    const produstArticleExist = await this.prisma.product.findFirst({
      where: {
        article: createProductData.article,
      }
    })
    const category = await this.prisma.category.findFirst({
      where: {
        id: createProductInput.category_id
      }
    })

    if (!category) {
      throw new BadRequestException(`Category with id ${createProductData.category_id} does not exist`)
    }

    if (document_ids && document_ids.length > 0) {
      document_ids.forEach((id) => {
        arrayOfProductDocuments.push({
          document_id: id,
        });
      });
    }

    if (produstTitleExist) {
      throw new BadRequestException('Product with this title exist')
    }
    if (produstArticleExist) {
      throw new BadRequestException('Product with this article exist')
    }

    return await this.prisma.product.create({
      data: {
        ...createProductData,
        ProductDocument: {
          createMany: {
            data: arrayOfProductDocuments
          }
        }
      }
    }
    )
  }

  async findAll(skip?: number, take?: number, categoryId?: number, search?: string): Promise<FindAllProductsOutput> {
    const where: Prisma.ProductWhereInput = {
      category_id: categoryId,
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { article: { contains: search, mode: 'insensitive' } },
      ]
    }

    const recivedProducts = await this.prisma.product.findMany({
      where,
      take,
      skip,
      include: { 
        ProductDocument: {
          where: {
            deleted_at: null
          }
        },
        Category: true
      }
    });

    const totalCount = await this.prisma.product.count({ where })
    return {
      products: recivedProducts,
      totalCount
    }
  }



  async findOne(id: number): Promise<Product> {
    const receivedProduct = await this.prisma.product.findFirst({
      where: {
        id
      },
      include: {
        ProductDocument: {
          where: { 
            deleted_at: null 
          } 
        },
        Category: true
      }  
    }) 

    if (!receivedProduct) {
      throw new NotFoundException()
    }

    return receivedProduct
  }

  async update(id: number, updateProductInput: UpdateProductInput): Promise<Product | null> {
    await this.prisma.product.update({
      where:{id},
      data: updateProductInput
    })
    return this.findOne(id) 
  }

  remove(id: number):Promise<Product> {
    return this.prisma.product.delete({
      where: {id}
    });
  }
}
