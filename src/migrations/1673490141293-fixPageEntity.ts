import { MigrationInterface, QueryRunner } from "typeorm";

export class fixPageEntity1673490141293 implements MigrationInterface {
    name = 'fixPageEntity1673490141293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ADD "content" character varying(1800) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "content"`);
    }

}
