import { MigrationInterface, QueryRunner } from "typeorm";

export class fixOpenBookApi1673369389903 implements MigrationInterface {
    name = 'fixOpenBookApi1673369389903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "booksCategoryId" integer`);
        await queryRunner.query(`ALTER TABLE "books_categories" ADD "booksId" uuid`);
        await queryRunner.query(`ALTER TABLE "books_categories" ADD "categoriesId" integer`);
        await queryRunner.query(`ALTER TABLE "pages" ADD "booksId" uuid`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_5397b301d312775cc7ff2bf7eef" FOREIGN KEY ("booksCategoryId") REFERENCES "books_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books_categories" ADD CONSTRAINT "FK_a1ddc2a8f7623603cfdb0596732" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books_categories" ADD CONSTRAINT "FK_94ed1a076f32876f0a15626dd8c" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "FK_24be6c3b5add50b7ec9b0c2f5d3" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "FK_24be6c3b5add50b7ec9b0c2f5d3"`);
        await queryRunner.query(`ALTER TABLE "books_categories" DROP CONSTRAINT "FK_94ed1a076f32876f0a15626dd8c"`);
        await queryRunner.query(`ALTER TABLE "books_categories" DROP CONSTRAINT "FK_a1ddc2a8f7623603cfdb0596732"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_5397b301d312775cc7ff2bf7eef"`);
        await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "booksId"`);
        await queryRunner.query(`ALTER TABLE "books_categories" DROP COLUMN "categoriesId"`);
        await queryRunner.query(`ALTER TABLE "books_categories" DROP COLUMN "booksId"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "booksCategoryId"`);
    }

}
