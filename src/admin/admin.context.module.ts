import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AddressesAdminModule } from './addresses_admin/addresses.module';
import { ClientsModule } from './clients/clients.module';
import { CompaniesModule } from './companies/companies.module';
import { IndividualsModule } from './individuals/individuals.module';
import { UsersModule } from './users_admin/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminDatabaseProvider } from 'src/database/providers/admin-database.provider';
import { AdminSeedService } from './admin.seed.service';
import { PlansModule } from './plans/plans.module';
import { ContractsModule } from './contracts/contracts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Configurações disponíveis em todo o app
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const connection = await AdminDatabaseProvider.useFactory();
        return {
          ...connection.options, // Usa as opções da conexão do provider
          autoLoadEntities: true, // Carrega as entidades automaticamente
        };
      },
    }),
    DatabaseModule,
    AddressesAdminModule,
    ClientsModule,
    CompaniesModule,
    IndividualsModule,
    PlansModule,
    ContractsModule,
    UsersModule,
  ],
  controllers: [], // Defina aqui os controllers do admin
  providers: [AdminSeedService], // Defina aqui os serviços do admin
})
export class AdminContextModule {}
