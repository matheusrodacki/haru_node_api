import { MigrationInterface, QueryRunner } from 'typeorm';

export class Admin1731963129140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS clients (
          client_id int(11) NOT NULL AUTO_INCREMENT,
          client_type enum('individual','company') NOT NULL,
          status enum('active','inactive','archived','deleted','lead') NOT NULL DEFAULT 'active',
          notes text,
          created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
          PRIMARY KEY (client_id)
        ); 
    `);

    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS addresses (
          address_id int(11) NOT NULL AUTO_INCREMENT,
          street varchar(255) NOT NULL,
          number varchar(255) NOT NULL,
          additionalInfo varchar(255) DEFAULT NULL,
          city varchar(255) NOT NULL,
          state varchar(255) NOT NULL,
          country varchar(255) NOT NULL,
          postalCode varchar(255) NOT NULL,
          address_type enum('comercial','residential','billing','shipping') NOT NULL,
          clientClientId int(11) DEFAULT NULL,
          PRIMARY KEY (address_id),
          KEY FK_22283b0980bf1cb28158732aaff (clientClientId),
          CONSTRAINT FK_22283b0980bf1cb28158732aaff FOREIGN KEY (clientClientId) REFERENCES clients (client_id) ON DELETE NO ACTION ON UPDATE NO ACTION
        ); 
    `);

    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS companies (
          client_id int(11) NOT NULL,
          company_name varchar(255) NOT NULL,
          tax_id_number varchar(255) NOT NULL,
          contact_person varchar(255) NOT NULL,
          PRIMARY KEY (client_id),
          CONSTRAINT FK_e3c8ca5369ea8f90fb94baa4ed9 FOREIGN KEY (client_id) REFERENCES clients (client_id) ON DELETE NO ACTION ON UPDATE NO ACTION
        ); 
    `);

    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS individuals (
          client_id int(11) NOT NULL,
          full_name varchar(255) NOT NULL,
          social_security_number varchar(255) NOT NULL,
          date_of_birth date DEFAULT NULL,
          PRIMARY KEY (client_id),
          CONSTRAINT FK_c66f54c6e3f7b73b394ea36d81a FOREIGN KEY (client_id) REFERENCES clients (client_id) ON DELETE NO ACTION ON UPDATE NO ACTION
        ); 
    `);

    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
          user_id int(11) NOT NULL AUTO_INCREMENT,
          first_name varchar(255) NOT NULL,
          last_name varchar(255) NOT NULL,
          email varchar(255) NOT NULL,
          passwordHash varchar(255) NOT NULL,
          phone varchar(255) DEFAULT NULL,
          role varchar(255) NOT NULL,
          status int(11) NOT NULL DEFAULT '1',
          created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
          clientClientId int(11) NOT NULL,
          PRIMARY KEY (user_id),
          KEY FK_7cca1d87838cac1ab798ac66760 (clientClientId),
          CONSTRAINT FK_7cca1d87838cac1ab798ac66760 FOREIGN KEY (clientClientId) REFERENCES clients (client_id) ON DELETE NO ACTION ON UPDATE NO ACTION
        ); 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE users;
        DROP TABLE individuals;
        DROP TABLE companies;
        DROP TABLE addresses;
        DROP TABLE clients;
    `);
  }
}
