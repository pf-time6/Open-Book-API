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
const books_entity_1 = __importDefault(require("./books.entity"));
const categories_entity_1 = __importDefault(require("./categories.entity"));
let Books_Categories = class Books_Categories {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Books_Categories.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => books_entity_1.default, books => books.id),
    __metadata("design:type", books_entity_1.default)
], Books_Categories.prototype, "books", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.default, categories => categories.id),
    __metadata("design:type", categories_entity_1.default)
], Books_Categories.prototype, "categories", void 0);
Books_Categories = __decorate([
    (0, typeorm_1.Entity)('books_categories')
], Books_Categories);
exports.default = Books_Categories;
//# sourceMappingURL=books_categories.entity.js.map