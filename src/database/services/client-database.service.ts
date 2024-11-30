import { Injectable } from '@nestjs/common';
import { ClientDatabaseProvider } from '../providers/client-database.provider';

@Injectable()
export class ClientDatabaseService {
  constructor(
    private readonly clientDatabaseProvider: ClientDatabaseProvider,
  ) {}

  async createClientDatabase(clientId: number): Promise<void> {
    const clientDatabaseName = `client_${clientId}`;
    // **Executar as migrations no banco de dados do cliente**
    const clientDataSource =
      await this.clientDatabaseProvider.createClientDataSource(
        clientDatabaseName,
      );

    await clientDataSource.initialize();
    await clientDataSource.runMigrations();
    await clientDataSource.destroy();
  }
}
