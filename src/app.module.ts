import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './admin/users_admin/users.module';
import { ClientsModule } from './admin/clients_tenants/clients.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedService } from './seed.service';
import { AddressesModule } from './admin/addresses_admin/addresses.module';
import { CompaniesModule } from './admin/companies/companies.module';
import { IndividualsModule } from './admin/individuals/individuals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('ADMIN_MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('ADMIN_MYSQL_USER'),
        password: configService.get<string>('ADMIN_MYSQL_PASSWORD'),
        database: configService.get<string>('ADMIN_MYSQL_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ClientsModule,
    AuthModule,
    CompaniesModule,
    IndividualsModule,
    AddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
