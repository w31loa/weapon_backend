import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketResolver } from './basket.resolver';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BasketResolver, BasketService],
  exports: [BasketService]
})
export class BasketModule {}
