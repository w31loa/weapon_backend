import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './models/category.model';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/common/guards/gql-jwt-auth.guard';
import { FindAllCategoriesOutput } from './dto/find-all-categories.output';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) { }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Category)
  createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput):Promise<Category> {
    return this.categoryService.create(createCategoryInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [FindAllCategoriesOutput], { name: 'categories' })
  findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ):Promise<FindAllCategoriesOutput> {
    return this.categoryService.findAll();
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number):Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Category)
  updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput):Promise<Category> {
    return this.categoryService.update(updateCategoryInput.id, updateCategoryInput);
  }

  @Mutation(() => Category)
  @UseGuards(GqlJwtAuthGuard)
  removeCategory(@Args('id', { type: () => Int }) id: number):Promise<Category> {
    return this.categoryService.remove(id);
  }
}
