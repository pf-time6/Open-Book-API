import { MigrationInterface, QueryRunner } from "typeorm";

export class openBookApi1673371347767 implements MigrationInterface {
    name = 'openBookApi1673371347767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_5397b301d312775cc7ff2bf7eef"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "booksCategoryId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "booksCategoryId" integer`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_5397b301d312775cc7ff2bf7eef" FOREIGN KEY ("booksCategoryId") REFERENCES "books_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
