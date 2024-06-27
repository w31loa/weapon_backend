import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { BasketModule } from 'src/basket/basket.module';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { MailModule } from 'src/common/mail/mail.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[BasketModule, PrismaModule,MailModule, UserModule],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
