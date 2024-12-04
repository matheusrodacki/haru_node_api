import { Injectable, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable({ scope: Scope.REQUEST }) // Cria um provider por request
export class ClientDatabaseProvider {
  private clients = new Map<string, DataSource>();

  async getClientConnection(clientId: string): Promise<DataSource> {
    if (!this.clients.has(clientId)) {
      const clientDatabase = new DataSource({
        type: 'mysql',
        host: process.env.ADMIN_MYSQL_HOST,
        port: +process.env.MYSQL_PORT,
        username: process.env.ADMIN_MYSQL_USER,
        password: process.env.ADMIN_MYSQL_PASSWORD,
        database: `client_${clientId}`, // Usa o ID do cliente para acessar a base correta
        entities: [__dirname + '/../client/**/*.entity{.ts,.js}'],
        synchronize: false,
      });
      await clientDatabase.initialize();
      this.clients.set(clientId, clientDatabase);
    }
    return this.clients.get(clientId);
  }

  // Novo método para criar um DataSource para um banco de dados específico
  async createClientDataSource(databaseName: string): Promise<DataSource> {
    return new DataSource({
      type: 'mysql',
      host: process.env.ADMIN_MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.ADMIN_MYSQL_USER,
      password: process.env.ADMIN_MYSQL_PASSWORD,
      database: databaseName,
      entities: [__dirname + '/../../client/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../migrations/client/*{.ts,.js}'],
      migrationsRun: false,
      synchronize: false,
    });
  }
}
