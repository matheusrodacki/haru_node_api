import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';
import { Client } from './entities/client.entity';
import { UsersModule } from 'src/users/users.module';
import { Individual } from 'src/individuals/entities/individual.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Individual, Company]),
    forwardRef(() => UsersModule),
  ],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [ClientsService, TypeOrmModule],
})
export class ClientsModule {}
