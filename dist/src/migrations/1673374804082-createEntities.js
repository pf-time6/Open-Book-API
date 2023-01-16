"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntities1673374804082 = void 0;
class createEntities1673374804082 {
    constructor() {
        this.name = 'createEntities1673374804082';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(120) NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_384deada87eb62ab31c5d5afae5" UNIQUE ("email"), CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "pages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "page" integer NOT NULL, "chapter" integer NOT NULL, "isChapter" boolean NOT NULL DEFAULT false, "chapterTitle" character varying(120) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "booksId" uuid, CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "about" character varying(120) NOT NULL, "coverUrl" character varying(350) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid, CONSTRAINT "UQ_3cd818eaf734a9d8814843f1197" UNIQUE ("title"), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(60) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "books_categories" ("id" SERIAL NOT NULL, "booksId" uuid, "categoriesId" integer, CONSTRAINT "PK_2133ce793c7a8b27bf9a6773623" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "pages" ADD CONSTRAINT "FK_24be6c3b5add50b7ec9b0c2f5d3" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "books_categories" ADD CONSTRAINT "FK_a1ddc2a8f7623603cfdb0596732" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "books_categories" ADD CONSTRAINT "FK_94ed1a076f32876f0a15626dd8c" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "books_categories" DROP CONSTRAINT "FK_94ed1a076f32876f0a15626dd8c"`);
            yield queryRunner.query(`ALTER TABLE "books_categories" DROP CONSTRAINT "FK_a1ddc2a8f7623603cfdb0596732"`);
            yield queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86"`);
            yield queryRunner.query(`ALTER TABLE "pages" DROP CONSTRAINT "FK_24be6c3b5add50b7ec9b0c2f5d3"`);
            yield queryRunner.query(`DROP TABLE "books_categories"`);
            yield queryRunner.query(`DROP TABLE "categories"`);
            yield queryRunner.query(`DROP TABLE "books"`);
            yield queryRunner.query(`DROP TABLE "pages"`);
            yield queryRunner.query(`DROP TABLE "author"`);
        });
    }
}
exports.createEntities1673374804082 = createEntities1673374804082;
//# sourceMappingURL=1673374804082-createEntities.js.map