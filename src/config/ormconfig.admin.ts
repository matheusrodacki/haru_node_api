import { dirname } from 'path';
import { DataSource } from 'typeorm';
import { fileURLToPath } from 'url';

// Simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AdminDataSource = new DataSource({
  type: 'mysql',
  host: process.env.ADMIN_MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.ADMIN_MYSQL_USER,
  password: process.env.ADMIN_MYSQL_PASSWORD,
  database: process.env.ADMIN_MYSQL_DATABASE,
  entities: [__dirname + '/../admin/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../admin/migrations/*.ts'],
  synchronize: false, // Nunca usar em produção
  logging: true, // Útil para debug
});
