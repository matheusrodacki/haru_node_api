import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminContextModule } from './admin/admin.context.module';
import { ClientContextModule } from './client/client.context.module';

@Module({
  imports: [AdminContextModule, AuthModule, ClientContextModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
