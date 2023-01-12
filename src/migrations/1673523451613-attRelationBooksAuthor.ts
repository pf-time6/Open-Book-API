import { MigrationInterface, QueryRunner } from "typeorm";

export class attRelationBooksAuthor1673523451613 implements MigrationInterface {
    name = 'attRelationBooksAuthor1673523451613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" ADD "content" character varying(480) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "content"`);
    }

}
