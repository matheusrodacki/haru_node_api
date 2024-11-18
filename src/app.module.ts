import { Module } from '@nestjs/common';
import { AdminModule } from './database/admin.module';
import { ClientModule } from './database/client.module';

@Module({
  imports: [AdminModule, ClientModule],
})
export class AppModule {}
