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
const books_entity_1 = __importDefault(require("../../entities/books.entity"));
const categories_entity_1 = __importDefault(require("../../entities/categories.entity"));
const books_categories_entity_1 = __importDefault(require("../../entities/books_categories.entity"));
const errors_1 = require("../../errors");
const typeorm_1 = require("typeorm");
const createBookService = (body, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const booksRepo = data_source_1.default.getRepository(books_entity_1.default);
    const bookFound = yield booksRepo.findOne({
        where: {
            title: body.title,
        },
    });
    if (bookFound) {
        throw new errors_1.AppError("Tittle already exists", 409);
    }
    const authorRepo = data_source_1.default.getRepository(author_entity_1.default);
    const authorFound = yield authorRepo.findOne({
        where: {
            id: userId,
        },
    });
    if (!authorFound) {
        throw new errors_1.AppError("Author not found", 409);
    }
    const books = booksRepo.create(Object.assign(Object.assign({}, body), { author: authorFound }));
    const categoriesRepo = data_source_1.default.getRepository(categories_entity_1.default);
    const bcRepo = data_source_1.default.getRepository(books_categories_entity_1.default);
    const loopCategories = yield categoriesRepo.findBy({
        id: (0, typeorm_1.Any)(body.category),
    });
    if (loopCategories.length !== body.category.length) {
        throw new errors_1.AppError(`There is at least one category that is not in the database.`, 404);
    }
    yield booksRepo.save(books);
    body.category.map((el) => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield categoriesRepo.findOneBy({
            id: el,
        });
        if (!categories) {
            return;
        }
        const books_categories = bcRepo.create({
            books,
            categories,
        });
        yield bcRepo.save(books_categories);
    }));
    return books;
});
exports.default = createBookService;
//# sourceMappingURL=createBook.service.js.map