import { MigrationInterface, QueryRunner } from "typeorm";

export class addDeletedColumn1673547227734 implements MigrationInterface {
    name = 'addDeletedColumn1673547227734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "deletedAt"`);
    }

}
