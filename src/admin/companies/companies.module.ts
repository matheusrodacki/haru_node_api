import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Client } from '../clients_tenants/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Client])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
