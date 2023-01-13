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
exports.addCityAndContryAtAuthorEntities1673381800289 = void 0;
class addCityAndContryAtAuthorEntities1673381800289 {
    constructor() {
        this.name = 'addCityAndContryAtAuthorEntities1673381800289';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "author" ADD "city" character varying(120) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "author" ADD "country" character varying(120) NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "author" DROP COLUMN "country"`);
            yield queryRunner.query(`ALTER TABLE "author" DROP COLUMN "city"`);
        });
    }
}
exports.addCityAndContryAtAuthorEntities1673381800289 = addCityAndContryAtAuthorEntities1673381800289;
//# sourceMappingURL=1673381800289-addCityAndContryAtAuthorEntities.js.map