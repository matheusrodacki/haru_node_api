import { MigrationInterface, QueryRunner } from "typeorm";

export class DbUpdate1732370652275 implements MigrationInterface {
    name = 'DbUpdate1732370652275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contracts\` (\`contract_id\` int NOT NULL AUTO_INCREMENT, \`contracted_price\` decimal(10,2) NOT NULL, \`contract_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'Active', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`client_id\` int NOT NULL, \`plan_id\` int NOT NULL, PRIMARY KEY (\`contract_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plans\` (\`plan_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`expiration\` date NULL, \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'Active', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`plan_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`addresses_admin\` CHANGE \`address_type\` \`address_type\` enum ('commercial', 'residential', 'billing', 'shipping') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'Active'`);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_9945462ca96b2c7d0a97e012cdc\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`client_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_e21b9501a425ebbe1ef5cb36198\` FOREIGN KEY (\`plan_id\`) REFERENCES \`plans\`(\`plan_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_e21b9501a425ebbe1ef5cb36198\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_9945462ca96b2c7d0a97e012cdc\``);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE \`addresses_admin\` CHANGE \`address_type\` \`address_type\` enum ('comercial', 'residential', 'billing', 'shipping') NOT NULL`);
        await queryRunner.query(`DROP TABLE \`plans\``);
        await queryRunner.query(`DROP TABLE \`contracts\``);
    }

}
