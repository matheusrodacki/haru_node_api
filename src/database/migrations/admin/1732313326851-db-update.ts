import { MigrationInterface, QueryRunner } from 'typeorm';

export class DbUpdate1732313326851 implements MigrationInterface {
  name = 'DbUpdate1732313326851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`contracts\` (\`contract_id\` int NOT NULL AUTO_INCREMENT, \`contracted_price\` decimal(10,2) NOT NULL, \`contract_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'Active', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`id_client\` int NULL, \`id_plan\` int NULL, PRIMARY KEY (\`contract_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`plans\` (\`plan_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`expiration\` date NULL, \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'Active', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`plan_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'Active'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`addresses_admin\` CHANGE \`address_type\` \`address_type\` enum ('commercial', 'residential', 'billing', 'shipping') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_eaeae84e38c0ef27fead84312f9\` FOREIGN KEY (\`id_client\`) REFERENCES \`clients\`(\`client_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_60e15f210645c83095997ebc217\` FOREIGN KEY (\`id_plan\`) REFERENCES \`plans\`(\`plan_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_96aac72f1574b88752e9fb00089\` FOREIGN KEY (\`user_id\`) REFERENCES \`addresses_admin\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_96aac72f1574b88752e9fb00089\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_60e15f210645c83095997ebc217\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_eaeae84e38c0ef27fead84312f9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`addresses_admin\` CHANGE \`address_type\` \`address_type\` enum ('comercial', 'residential', 'billing', 'shipping') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'active'`,
    );
    await queryRunner.query(`DROP TABLE \`plans\``);
    await queryRunner.query(`DROP TABLE \`contracts\``);
  }
}
