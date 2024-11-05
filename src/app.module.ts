import { INestApplication, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize:
          configService.get<string>('NODE_ENV') === 'development'
            ? configService.get<boolean>('DB_SYNCHRONIZE')
            : false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    OrganizationsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
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

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
