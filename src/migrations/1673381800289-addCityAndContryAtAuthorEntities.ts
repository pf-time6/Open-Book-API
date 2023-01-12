import { MigrationInterface, QueryRunner } from "typeorm";

export class addCityAndContryAtAuthorEntities1673381800289 implements MigrationInterface {
    name = 'addCityAndContryAtAuthorEntities1673381800289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author" ADD "city" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "author" ADD "country" character varying(120) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "city"`);
    }

}
