import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './admin/users_admin/users.module';
import { ClientsModule } from './admin/clients/clients.module';
import { PlansModule } from './admin/plans/plans.module';
import { ContractsModule } from './admin/contracts/contracts.module';
import { ProfilesModule } from './admin/profiles_admin/profile.module';
import { PermissionsModule } from './admin/permissions_admin/permissions.module';
import { AddressesClientModule } from './client/addresses_client/addresses.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Configuração global de validação do DTO
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Configuração básica do Swagger admin
  const adminConfig = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('Admin API Documentation')
    .setVersion('1.0')
    .addBearerAuth() // Se estiver usando autenticação JWT
    .build();

  const adminDocument = SwaggerModule.createDocument(app, adminConfig, {
    include: [
      AuthModule,
      ClientsModule,
      PlansModule,
      ContractsModule,
      UsersModule,
      ProfilesModule,
      PermissionsModule,
    ],
  });
  SwaggerModule.setup('api-admin', app, adminDocument);

  // Configuração básica do Swagger client
  const clientConfig = new DocumentBuilder()
    .setTitle('Client API')
    .setDescription('Client API Documentation')
    .setVersion('1.0')
    .addBearerAuth() // Se estiver usando autenticação JWT
    .build();

  const clientDocument = SwaggerModule.createDocument(app, clientConfig, {
    include: [AddressesClientModule],
  });
  SwaggerModule.setup('api-client', app, clientDocument);

  //Enable CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
