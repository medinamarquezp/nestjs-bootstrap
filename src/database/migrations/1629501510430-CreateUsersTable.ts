import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1629501510430 implements MigrationInterface {
    name = 'CreateUsersTable1629501510430';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`nestjs-bootstrap\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`salt\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'guest', UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`nestjs-bootstrap\`.\`user\``,
        );
        await queryRunner.query(`DROP TABLE \`nestjs-bootstrap\`.\`user\``);
    }
}
