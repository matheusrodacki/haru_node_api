import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class DbUpdate1732473091900 implements MigrationInterface {
  name = 'DbUpdate1732473091900';
  logger = new Logger('Migration DbUpdate2');

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`permissions\` (\`permission_id\` int NOT NULL AUTO_INCREMENT, \`role\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`permission_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`profiles\` (\`profile_id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`profile_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`profiles_permissions_permissions\` (\`profilesProfileId\` int NOT NULL, \`permissionsPermissionId\` int NOT NULL, INDEX \`IDX_d7ea8d7a07b928c406aba07794\` (\`profilesProfileId\`), INDEX \`IDX_fe6c8d3a6d63b4c2e654f548e3\` (\`permissionsPermissionId\`), PRIMARY KEY (\`profilesProfileId\`, \`permissionsPermissionId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`profile_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'Active'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contracts\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'Active'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`plans\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'Active'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_23371445bd80cb3e413089551bf\` FOREIGN KEY (\`profile_id\`) REFERENCES \`profiles\`(\`profile_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles_permissions_permissions\` ADD CONSTRAINT \`FK_d7ea8d7a07b928c406aba07794d\` FOREIGN KEY (\`profilesProfileId\`) REFERENCES \`profiles\`(\`profile_id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles_permissions_permissions\` ADD CONSTRAINT \`FK_fe6c8d3a6d63b4c2e654f548e36\` FOREIGN KEY (\`permissionsPermissionId\`) REFERENCES \`permissions\`(\`permission_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    this.logger.log(
      'Profiles, Permissions and ProfilesPermissions tables created!',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`profiles_permissions_permissions\` DROP FOREIGN KEY \`FK_fe6c8d3a6d63b4c2e654f548e36\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`profiles_permissions_permissions\` DROP FOREIGN KEY \`FK_d7ea8d7a07b928c406aba07794d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_23371445bd80cb3e413089551bf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`plans\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'active'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contracts\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'active'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`clients\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'archived', 'deleted', 'lead') NOT NULL DEFAULT 'active'`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`deleted_at\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`profile_id\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fe6c8d3a6d63b4c2e654f548e3\` ON \`profiles_permissions_permissions\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d7ea8d7a07b928c406aba07794\` ON \`profiles_permissions_permissions\``,
    );
    await queryRunner.query(`DROP TABLE \`profiles_permissions_permissions\``);
    await queryRunner.query(`DROP TABLE \`profiles\``);
    await queryRunner.query(`DROP TABLE \`permissions\``);
    this.logger.log(
      'Profiles, Permissions and ProfilesPermissions tables dropped!',
    );
  }
}
