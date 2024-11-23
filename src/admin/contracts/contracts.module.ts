import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { Contract } from './contract.entity';
import { Plan } from '../plans/plan.entity';
import { Client } from '../clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contract, Plan, Client])],
  providers: [ContractsService],
  controllers: [ContractsController],
  exports: [ContractsService, TypeOrmModule],
})
export class ContractsModule {}
