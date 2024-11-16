import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Client } from 'src/clientContext/clientTenants/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, Client])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
