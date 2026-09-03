import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookiePasrser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.use(cookiePasrser())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // выкидывает из тела запроса поля, не описанные в DTO
      forbidNonWhitelisted: true
    })
  )
  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })

  await app.listen(3001);
}
bootstrap();
