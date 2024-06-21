import { Injectable } from '@nestjs/common';
import { CreateBasketInput } from './dto/create-basket.input';
import { UpdateBasketInput } from './dto/update-basket.input';

@Injectable()
export class BasketService {
  // create(createBasketInput: CreateBasketInput) {
  //   return 'This action adds a new basket';
  // }

  findAll() {
    return `This action returns all basket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  update(id: number, updateBasketInput: UpdateBasketInput) {
    return `This action updates a #${id} basket`;
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
