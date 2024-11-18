import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.ADMIN_MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.ADMIN_MYSQL_USER,
  password: process.env.ADMIN_MYSQL_PASSWORD,
  database: process.env.ADMIN_MYSQL_DATABASE,
  entities: ['src/admin/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  logging: true, // Útil para debug
});

//console.log('Entidades carregadas:', AppDataSource.options.entities);

export default AppDataSource;
