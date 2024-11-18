import { getAdminConnection } from 'src/database/admin.database.provider';
import { DataSource } from 'typeorm';

async function runClientMigrations() {
  const adminConnection = await getAdminConnection();
  const clients = await adminConnection.query('SELECT id FROM clients');

  for (const client of clients) {
    const clientConnection = new DataSource({
      type: 'mysql',
      host: process.env.CLIENT_DB_HOST,
      port: +process.env.CLIENT_DB_PORT,
      username: process.env.CLIENT_DB_USERNAME,
      password: process.env.CLIENT_DB_PASSWORD,
      database: `client_${client.id}`,
      entities: [__dirname + '/../client/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../client/migrations/*.ts'],
      synchronize: false,
      logging: true,
    });

    await clientConnection.initialize();
    console.log(`Running migrations for client ${client.id}...`);
    await clientConnection.runMigrations();
    console.log(`Migrations completed for client ${client.id}`);
    await clientConnection.destroy();
  }
}

runClientMigrations()
  .then(() => console.log('Migrations applied to all clients'))
  .catch((error) => console.error('Error running migrations:', error));
