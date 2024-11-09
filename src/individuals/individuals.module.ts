import { Module } from '@nestjs/common';
import { IndividualsService } from './individuals.service';
import { IndividualsController } from './individuals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Individual } from './entities/individual.entity';
import { Client } from 'src/clients/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Individual, Client])],
  providers: [IndividualsService],
  controllers: [IndividualsController],
  exports: [IndividualsService],
})
export class IndividualsModule {}
