import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Category } from './models/category.model';
import { FindAllCategoriesOutput } from './dto/find-all-categories.output';

@Injectable()
export class CategoryService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {

    const categoryExist = await this.prisma.category.findFirst({
      where: { title: createCategoryInput.title }
    })
    if (categoryExist) {
      throw new BadRequestException("This category already exist!")
    }

    return await this.prisma.category.create({
      data: createCategoryInput
    })
  }

  async findAll(skip?: number, take?: number,): Promise<FindAllCategoriesOutput> {
    const recievidCategoires = await this.prisma.category.findMany({
      take,
      skip
    })

    const totalCount = await this.prisma.category.count({})

    return {
      categories: recievidCategoires,
      totalCount
    }
  }

  async findOne(id: number): Promise<Category> {
    const receivedCategory = await this.prisma.product.findFirst({
      where: {
        id
      }
    })
    if (!receivedCategory) {
      throw new NotFoundException()
    }
    return receivedCategory

  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput): Promise<Category | null> {
    await this.prisma.category.update({
      where: { id },
      data: updateCategoryInput
    })
    return this.findOne(id)
  }

  async remove(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: { id }
    });
  }
}
