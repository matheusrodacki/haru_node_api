import { getAdminConnection } from 'src/database/providers/admin-database.provider';
import { DataSource } from 'typeorm';

async function runClientMigrations() {
  const adminConnection = await getAdminConnection();
  const clients = await adminConnection.query('SELECT id FROM clients');

  for (const client of clients) {
    const clientConnection = new DataSource({
      type: 'mysql',
      host: process.env.ADMIN_MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.ADMIN_MYSQL_USER,
      password: process.env.ADMIN_MYSQL_PASSWORD,
      database: `client_${client.id_client}`, // Usa o ID do cliente para acessar a base correta
      entities: [__dirname + '/../client/**/*.entity{.ts,.js}'],
      synchronize: false,
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
