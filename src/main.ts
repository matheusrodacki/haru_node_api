import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Haru Digital - API Documentation')
    .setDescription(
      'This is the API documentation for our system. Here you can find all the available endpoints, their descriptions, and expected parameters.',
    )
    .setVersion('1.0')
    .setTermsOfService('https://harudigital.com/terms')
    .setContact(
      'Developer Team',
      'https://hdsoltec.com',
      'equipehdbrasil@gmail.com',
    )
    .setLicense('Restricted Use License', 'https://harudigital.com/license')
    .addBearerAuth()
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 8001);
}
bootstrap();
