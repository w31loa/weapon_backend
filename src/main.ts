import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  //ЧЕ ЭТО 
  // app.useStaticAssets(join(__dirname, config.get('STATIC_PATH')!), {
  //   prefix: config.get('static_prefix') ?? '/static/',
  // });
  await app.listen(3000);
}
bootstrap();
