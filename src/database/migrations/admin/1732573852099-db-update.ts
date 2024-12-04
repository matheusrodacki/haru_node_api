import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class DbUpdate1732573852099 implements MigrationInterface {
  name = 'DbUpdate1732573852099';
  logger = new Logger('Migration DbUpdate4');

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    this.logger.log('Role column removed!');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL`,
    );
    this.logger.log('Role column added!');
  }
}
