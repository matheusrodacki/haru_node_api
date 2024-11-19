import { DataSource } from 'typeorm';

const ClientDataSource = new DataSource({
  type: 'mysql',
  host: process.env.ADMIN_MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.ADMIN_MYSQL_USER,
  password: process.env.ADMIN_MYSQL_PASSWORD,
  database: process.env.CLIENT_DB_TEMPLATE,
  entities: ['src/client/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/client/*.ts'],
  synchronize: false,
  logging: true, // Útil para debug
});

//console.log('Entidades carregadas:', AppDataSource.options.entities);

export default ClientDataSource;
