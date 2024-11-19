import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressClient } from './address.entity';
import { AddressesClientController } from './addresses.controller';
import { AddressesClientService } from './addresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressClient])],
  controllers: [AddressesClientController],
  providers: [AddressesClientService],
})
export class AddressesClientModule {}
