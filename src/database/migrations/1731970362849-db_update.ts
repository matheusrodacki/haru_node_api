import { MigrationInterface, QueryRunner } from "typeorm";

export class DbUpdate1731970362849 implements MigrationInterface {
    name = 'DbUpdate1731970362849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies\` ADD \`teste_coluna\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD \`matricula\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'Active'`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'Active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`matricula\``);
        await queryRunner.query(`ALTER TABLE \`companies\` DROP COLUMN \`teste_coluna\``);
    }

}
