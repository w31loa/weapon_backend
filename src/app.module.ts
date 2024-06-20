import { Module } from '@nestjs/common';
import { PrismaModule } from './common/prisma/prisma.module';
import { MailModule } from './common/mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { BasketModule } from './basket/basket.module';
import { OrderModule } from './order/order.module';
import { DocumentModule } from './common/document/document.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      playground: true,
      driver: ApolloDriver,
      // resolvers: { JSON: GraphQLJSON },
    }),
    ConfigModule.forRoot({ isGlobal: true}),
    PrismaModule, MailModule, AuthModule, UserModule, CategoryModule, ProductModule, BasketModule, OrderModule, DocumentModule],
})
export class AppModule {}
