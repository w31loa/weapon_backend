import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductModel } from './models/product';
import { FindAllProductsOutput } from './dto/find-all-products.output';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/common/guards/gql-jwt-auth.guard';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput):Promise<Product> {
    return this.productService.create(createProductInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => FindAllProductsOutput, { name: 'products' })
  findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('categoryId', { type: () => Int, nullable: true }) categoryId?: number
  ): Promise<FindAllProductsOutput> {
    return this.productService.findAll(skip, take,categoryId , search);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number):Promise<Product>{
    return this.productService.findOne(id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput):Promise<Product> {
    return this.productService.update(updateProductInput.id, updateProductInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number):Promise<Product> {
    return this.productService.remove(id);
  }
}
