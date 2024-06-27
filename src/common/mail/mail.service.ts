import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Order } from 'src/order/models/order.model';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'src/user/models/user.model';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService
    ) { }

    async sendNewOrderEmail(order: Order, user: User) {
        const data = await this.prisma.basket.findFirst({
            where: { user_id: user.id },
            select: {
                ProductsInBasket: {
                    where: { deleted_at: null },
                    select: {
                        Product: true,
                        value: true
                    }
                }
            }
        })

        const productsHtml = data.ProductsInBasket.map(el => {
            return `<p>${el.Product.title} ${el.value} шт.</p>`
        }).join('')
        this.mailerService.sendMail({
            to: user.email,
            from: this.configService.get('EMAIL_USER'),
            html: `<h1>Здравствуйте!</h1>
                <p>Заказ с номером ${order.id} создан!</p>
                <p>Список позиций:</p>`+
                productsHtml
        })
    }
}
