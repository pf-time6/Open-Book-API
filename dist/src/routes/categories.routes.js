"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_1 = require("../controllers/categories");
const getCategories_controller_1 = __importDefault(require("../controllers/categories/getCategories.controller"));
const middlewares_1 = require("../middlewares");
const isAdm_middleware_1 = __importDefault(require("../middlewares/isAdm.middleware"));
const categoriesRoutes = (0, express_1.Router)();
categoriesRoutes.post("", middlewares_1.ensureAuthMiddleware, isAdm_middleware_1.default, categories_1.createCategoryController);
categoriesRoutes.get("", getCategories_controller_1.default);
exports.default = categoriesRoutes;
//# sourceMappingURL=categories.routes.js.map