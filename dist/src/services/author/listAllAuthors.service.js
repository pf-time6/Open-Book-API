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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const author_entity_1 = __importDefault(require("../../entities/author.entity"));
const author_1 = require("../../schemas/author");
const listAllAuthorsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const authorRepo = data_source_1.default.getRepository(author_entity_1.default);
    const authorWithBooks = yield authorRepo
        .createQueryBuilder("author")
        .leftJoinAndSelect("author.books", "books")
        .getMany();
    const authorWithoutPassword = yield author_1.authorArrayReturnSchema.validate(authorWithBooks, {
        stripUnknown: true,
    });
    return authorWithoutPassword;
});
exports.default = listAllAuthorsService;
//# sourceMappingURL=listAllAuthors.service.js.map