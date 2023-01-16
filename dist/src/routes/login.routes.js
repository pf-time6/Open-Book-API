"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const author_1 = require("../controllers/author");
const middlewares_1 = require("../middlewares");
const author_2 = require("../schemas/author");
const loginRoutes = (0, express_1.Router)();
loginRoutes.post("", (0, middlewares_1.validateSchemaMiddleware)(author_2.loginAuthorSchema), author_1.loginAuthorController);
exports.default = loginRoutes;
//# sourceMappingURL=login.routes.js.map