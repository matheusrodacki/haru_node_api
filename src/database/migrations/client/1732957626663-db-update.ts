import { MigrationInterface, QueryRunner } from 'typeorm';

export class DbUpdate1732957626663 implements MigrationInterface {
  name = 'DbUpdate1732957626663';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`addresses_client\` (\`address_id\` int NOT NULL AUTO_INCREMENT, \`street\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`additionalInfo\` varchar(255) NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`postalCode\` varchar(255) NOT NULL, \`deleted_at\` datetime(6) NULL, \`address_type\` enum ('commercial', 'residential', 'billing', 'shipping') NOT NULL, PRIMARY KEY (\`address_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`addresses_client\``);
  }
}
