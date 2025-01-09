import { MigrationInterface, QueryRunner } from 'typeorm';

export class DbUpdate1736456982304 implements MigrationInterface {
  name = 'DbUpdate1736456982304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`client_id\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_0d1e90d75674c54f8660c4ed446\` FOREIGN KEY (\`client_id\`) REFERENCES \`clients\`(\`client_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_0d1e90d75674c54f8660c4ed446\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`client_id\``);
  }
}
