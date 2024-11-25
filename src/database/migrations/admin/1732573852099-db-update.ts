import { MigrationInterface, QueryRunner } from "typeorm";

export class DbUpdate1732573852099 implements MigrationInterface {
    name = 'DbUpdate1732573852099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL`);
    }

}
