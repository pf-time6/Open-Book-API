"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const author_entity_1 = __importDefault(require("./author.entity"));
const books_categories_entity_1 = __importDefault(require("./books_categories.entity"));
const pages_entity_1 = __importDefault(require("./pages.entity"));
let Books = class Books {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Books.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Books.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], Books.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 350 }),
    __metadata("design:type", String)
], Books.prototype, "coverUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Books.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => author_entity_1.default, (author) => author.books),
    __metadata("design:type", author_entity_1.default)
], Books.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pages_entity_1.default, (pages) => pages.books),
    __metadata("design:type", Array)
], Books.prototype, "pages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => books_categories_entity_1.default, (books_categories) => books_categories.books),
    __metadata("design:type", Array)
], Books.prototype, "books_categories", void 0);
Books = __decorate([
    (0, typeorm_1.Entity)("books")
], Books);
exports.default = Books;
//# sourceMappingURL=books.entity.js.map