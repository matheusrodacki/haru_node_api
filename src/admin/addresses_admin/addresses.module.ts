import { Module } from '@nestjs/common';
import { AddressesAdminService } from './addresses.service';
import { AddressesAdminController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressAdmin } from './address.entity';
import { Client } from '../clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressAdmin, Client])],
  controllers: [AddressesAdminController],
  providers: [AddressesAdminService],
})
export class AddressesAdminModule {}
