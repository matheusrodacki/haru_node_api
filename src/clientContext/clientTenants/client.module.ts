import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';
import { Client } from './client.entity';
import { UsersModule } from 'src/clientContext/users/users.module';
import { Individual } from 'src/clientContext/individuals/individual.entity';
import { Company } from 'src/clientContext/companies/company.entity';
import { AddressesService } from 'src/clientContext/addresses/addresses.service';
import { Address } from 'src/clientContext/addresses/address.entity';

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
