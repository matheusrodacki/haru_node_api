import { getAdminConnection } from 'src/database/providers/admin-database.provider';
import { DataSource } from 'typeorm';

async function runClientMigrations(client_id) {
  const clientConnection = new DataSource({
    type: 'mysql',
    host: process.env.ADMIN_MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.ADMIN_MYSQL_USER,
    password: process.env.ADMIN_MYSQL_PASSWORD,
    database: `db_client_${client_id}`, // Usa o ID do cliente para acessar a base correta
    entities: ['src/client/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/client/*.ts'],
    synchronize: false,
  });

  try {
    await clientConnection.initialize();
    console.log(`Running migrations for client ${client_id}...`);
    await clientConnection.runMigrations();
  } catch (error) {
    console.error(`Error running migrations for client ${client_id}:`, error);
    throw error;
  } finally {
    await clientConnection.destroy();
  }
}

async function runAllClientMigrations() {
  const adminConnection = await getAdminConnection();
  try {
    const clients = await adminConnection.query(
      'SELECT client_id FROM clients',
    );
    clients.push({ client_id: 'template' });

    for (const client of clients) {
      await runClientMigrations(client.client_id);
    }
    console.log('Migrations applied to all clients successfully.');
  } catch (error) {
    console.error('Error running migrations for all clients:', error);
    throw error;
  } finally {
    await adminConnection.destroy();
  }
}

const clientIdArgs = process.argv[2];

if (!clientIdArgs) {
  console.error('Usage: ts-node script.ts <client_id | all>');
  process.exit(1);
}
async function main() {
  if (clientIdArgs === 'all') {
    try {
      await runAllClientMigrations();
      process.exit(0);
    } catch {
      process.exit(1);
    }
  } else {
    try {
      await runClientMigrations(clientIdArgs);
      console.log('Migrations applied to client:', clientIdArgs);
      process.exit(0);
    } catch {
      process.exit(1);
    }
  }
}
main();
