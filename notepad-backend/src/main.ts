import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookiePasrser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.use(cookiePasrser())
  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })

  await app.listen(3001);
}
bootstrap();
