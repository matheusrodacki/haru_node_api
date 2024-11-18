import { Module, MiddlewareConsumer } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ClientMiddleware } from '../middleware/client.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [], // Defina aqui os controllers dos clientes
  providers: [], // Defina aqui os serviços dos clientes
})
export class ClientModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientMiddleware).forRoutes('*'); // Aplica o middleware em todas as rotas
  }
}
