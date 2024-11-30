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
import { PlansModule } from './plans/plans.module';
import { ContractsModule } from './contracts/contracts.module';
import { ProfilesModule } from './profiles_admin/profile.module';
import { PermissionsModule } from './permissions_admin/permissions.module';
import { AdminSeedService } from './admin.seed.service';

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
    AddressesAdminModule,
    ClientsModule,
    CompaniesModule,
    IndividualsModule,
    PlansModule,
    ContractsModule,
    UsersModule,
    ProfilesModule,
    PermissionsModule,
    DatabaseModule,
  ],
  providers: [AdminSeedService], // Defina aqui os serviços do admin
})
export class AdminContextModule {}
