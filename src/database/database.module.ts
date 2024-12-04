import { Module } from '@nestjs/common';
import { AdminDatabaseProvider } from './providers/admin-database.provider';
import { ClientDatabaseProvider } from './providers/client-database.provider';
import { ClientDatabaseService } from './services/client-database.service';

@Module({
  providers: [
    AdminDatabaseProvider,
    ClientDatabaseService,
    ClientDatabaseProvider,
  ],
  exports: [
    AdminDatabaseProvider,
    ClientDatabaseService,
    ClientDatabaseProvider,
  ],
})
export class DatabaseModule {}
