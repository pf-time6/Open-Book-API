"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_1 = require("../controllers/books");
const pages_1 = require("../controllers/pages");
const middlewares_1 = require("../middlewares");
const books_2 = require("../schemas/books");
const booksRoutes = (0, express_1.Router)();
booksRoutes.post("", (0, middlewares_1.validateSchemaMiddleware)(books_2.createBooksRequestSchema), middlewares_1.ensureAuthMiddleware, books_1.createBookController);
booksRoutes.get("", books_1.listBooksController);
booksRoutes.get("/:id", middlewares_1.ensureBookExists, books_1.showBookController);
booksRoutes.post("/:id", pages_1.createPagesController);
exports.default = booksRoutes;
//# sourceMappingURL=books.routes.js.map