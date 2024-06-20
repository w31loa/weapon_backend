import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CategoryModel } from './models/category';

@Injectable()
export class CategoryService {

  constructor(private readonly prisma:PrismaService){

  }

  async create(createCategoryInput: CreateCategoryInput): Promise<CategoryModel> {

    const categoryExist = await this.prisma.catecory.findFirst({
      where: {title: createCategoryInput.title}
    })

    return await this.prisma.catecory.create({
      data: createCategoryInput
    })
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
