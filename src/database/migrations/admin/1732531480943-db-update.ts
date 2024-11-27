import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class DbUpdate1732531480943 implements MigrationInterface {
  name = 'DbUpdate1732531480943';
  logger = new Logger('Migration DbUpdate3');

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`addresses_admin\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`individuals\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contracts\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`plans\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'active'`,
    );
    this.logger.log('Deleted_at columns added!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`status\` int NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(`ALTER TABLE \`plans\` DROP COLUMN \`deleted_at\``);
    await queryRunner.query(
      `ALTER TABLE \`contracts\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`individuals\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`companies\` DROP COLUMN \`deleted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`addresses_admin\` DROP COLUMN \`deleted_at\``,
    );
    this.logger.log('Deleted_at columns removed!');
  }
}
