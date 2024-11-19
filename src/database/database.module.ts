import { Module } from '@nestjs/common';
import { AdminDatabaseProvider } from './providers/admin-database.provider';
import { ClientDatabaseProvider } from './providers/client-database.provider';

@Module({
  providers: [AdminDatabaseProvider, ClientDatabaseProvider],
  exports: [AdminDatabaseProvider, ClientDatabaseProvider],
})
export class DatabaseModule {}
