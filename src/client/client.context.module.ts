import { Module, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ClientMiddleware } from '../middleware/client.middleware';
import { AddressesClientModule } from './addresses_client/addresses.module';
import { ClientSeedService } from './client.seed.service';

@Module({
  imports: [DatabaseModule, AddressesClientModule],
  controllers: [], // Defina aqui os controllers dos clientes
  providers: [ClientSeedService], // Defina aqui os serviços dos clientes
})
export class ClientContextModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientMiddleware).forRoutes('/client/*'); // Aplica o middleware em todas as rotas
  }
}
