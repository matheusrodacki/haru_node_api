import { DataSource } from 'typeorm';

let adminDataSource: DataSource;

export const AdminDatabaseProvider = {
  provide: 'ADMIN_DATABASE_CONNECTION',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'mysql',
      host: process.env.ADMIN_MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.ADMIN_MYSQL_USER,
      password: process.env.ADMIN_MYSQL_PASSWORD,
      database: process.env.ADMIN_MYSQL_DATABASE,
      entities: [__dirname + '/../admin/**/*.entity{.ts,.js}'],
      synchronize: false, // Mantenha falso em produção
    });
    return dataSource.initialize();
  },
};

/**
 * Utility function to get the admin database connection.
 */
export const getAdminConnection = async (): Promise<DataSource> => {
  if (!adminDataSource) {
    adminDataSource = new DataSource({
      type: 'mysql',
      host: process.env.ADMIN_MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.ADMIN_MYSQL_USER,
      password: process.env.ADMIN_MYSQL_PASSWORD,
      database: process.env.ADMIN_MYSQL_DATABASE,
      entities: [__dirname + '/../admin/entities/*.entity{.ts,.js}'],
      synchronize: false,
    });
    await adminDataSource.initialize();
  }
  return adminDataSource;
};
