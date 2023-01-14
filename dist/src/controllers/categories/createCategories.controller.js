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
const categories_1 = require("../../services/categories");
const createCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = req.body;
    const newCategory = yield (0, categories_1.createCategoryService)(categoryData);
    return res.status(201).json(newCategory);
});
exports.default = createCategoryController;
//# sourceMappingURL=createCategories.controller.js.map