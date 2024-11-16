import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';
import { Client } from './client.entity';
import { UsersModule } from 'src/users/users.module';
import { Individual } from 'src/individuals/individual.entity';
import { Company } from 'src/companies/company.entity';
import { AddressesService } from 'src/addresses/addresses.service';
import { Address } from 'src/addresses/address.entity';

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
