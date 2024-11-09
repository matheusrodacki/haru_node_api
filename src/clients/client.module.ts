import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './client.service';
import { ClientsController } from './client.controller';
import { Client } from './entities/client.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), forwardRef(() => UsersModule)],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [ClientsService, TypeOrmModule],
})
export class ClientsModule {}
