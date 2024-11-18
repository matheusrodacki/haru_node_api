import { Module } from '@nestjs/common';
import { AdminDatabaseProvider } from './admin.database.provider';
import { ClientDatabaseProvider } from './client.database.provider';

@Module({
  providers: [AdminDatabaseProvider, ClientDatabaseProvider],
  exports: [AdminDatabaseProvider, ClientDatabaseProvider],
})
export class DatabaseModule {}
