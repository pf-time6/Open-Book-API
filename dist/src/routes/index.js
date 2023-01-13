"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagesRoutes = exports.categoriesRoutes = exports.booksRoutes = exports.loginRoutes = exports.authorRoutes = void 0;
const author_routes_1 = __importDefault(require("./author.routes"));
exports.authorRoutes = author_routes_1.default;
const login_routes_1 = __importDefault(require("./login.routes"));
exports.loginRoutes = login_routes_1.default;
const books_routes_1 = __importDefault(require("./books.routes"));
exports.booksRoutes = books_routes_1.default;
const categories_routes_1 = __importDefault(require("./categories.routes"));
exports.categoriesRoutes = categories_routes_1.default;
const pages_routes_1 = __importDefault(require("./pages.routes"));
exports.pagesRoutes = pages_routes_1.default;
//# sourceMappingURL=index.js.map