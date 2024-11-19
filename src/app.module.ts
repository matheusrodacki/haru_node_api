import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminContextModule } from './admin/admin.context.module';

@Module({
  imports: [AdminContextModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
