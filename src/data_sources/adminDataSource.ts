import { DataSource } from 'typeorm';

export const AdminDataSource = new DataSource({
  type: 'mysql',
  host: process.env.ADMIN_MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.ADMIN_MYSQL_USER,
  password: process.env.ADMIN_MYSQL_PASSWORD,
  database: process.env.ADMIN_MYSQL_DATABASE,
  entities: [
    /* entidades da database do admin */
  ],
  synchronize: false,
});
