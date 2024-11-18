import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [], // Defina aqui os controllers do admin
  providers: [], // Defina aqui os serviços do admin
})
export class AdminModule {}
