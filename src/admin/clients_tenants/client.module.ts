import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';
import { Client } from './client.entity';
import { Address } from '../addresses_admin/address.entity';
import { AddressesService } from '../addresses_admin/addresses.service';
import { Company } from '../companies/company.entity';
import { Individual } from '../individuals/individual.entity';
import { UsersModule } from '../users_admin/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Individual, Company, Address]),
    forwardRef(() => UsersModule),
  ],
  providers: [ClientsService, AddressesService],
  controllers: [ClientsController],
  exports: [ClientsService, TypeOrmModule],
})
export class ClientsModule {}
