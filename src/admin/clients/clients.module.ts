import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './client.entity';
import { AddressAdmin } from '../addresses_admin/address.entity';
import { AddressesAdminService } from '../addresses_admin/addresses.service';
import { Company } from '../companies/company.entity';
import { Individual } from '../individuals/individual.entity';
import { UsersModule } from '../users_admin/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Individual, Company, AddressAdmin]),
    forwardRef(() => UsersModule),
  ],
  providers: [ClientsService, AddressesAdminService],
  controllers: [ClientsController],
  exports: [ClientsService, TypeOrmModule],
})
export class ClientsModule {}
