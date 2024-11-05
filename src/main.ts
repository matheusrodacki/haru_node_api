import { NestFactory } from '@nestjs/core';
import { AppModule, setupSwagger } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 8001);
}
bootstrap();
