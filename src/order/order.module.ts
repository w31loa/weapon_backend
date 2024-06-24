import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { BasketModule } from 'src/basket/basket.module';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports:[BasketModule, PrismaModule],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
