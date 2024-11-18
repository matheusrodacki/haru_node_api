import { Injectable, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable({ scope: Scope.REQUEST }) // Cria um provider por request
export class ClientDatabaseProvider {
  private clients = new Map<string, DataSource>();

  async getClientConnection(clientId: string): Promise<DataSource> {
    if (!this.clients.has(clientId)) {
      const clientDatabase = new DataSource({
        type: 'mysql',
        host: process.env.CLIENT_DB_HOST,
        port: +process.env.CLIENT_DB_PORT,
        username: process.env.CLIENT_DB_USERNAME,
        password: process.env.CLIENT_DB_PASSWORD,
        database: `client_${clientId}`, // Usa o ID do cliente para acessar a base correta
        entities: [__dirname + '/../client/**/*.entity{.ts,.js}'],
        synchronize: false,
      });
      await clientDatabase.initialize();
      this.clients.set(clientId, clientDatabase);
    }
    return this.clients.get(clientId);
  }
}
