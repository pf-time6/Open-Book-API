"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const author_1 = require("../controllers/author");
const middlewares_1 = require("../middlewares");
const author_2 = require("../schemas/author");
const authorRoutes = (0, express_1.Router)();
authorRoutes.get("", author_1.listAllAuthorsController);
authorRoutes.get("/:id", author_1.getAuthorController);
authorRoutes.post("", (0, middlewares_1.validateSchemaMiddleware)(author_2.createAuthorRequestSchema), author_1.createAuthorController);
exports.default = authorRoutes;
//# sourceMappingURL=author.routes.js.map