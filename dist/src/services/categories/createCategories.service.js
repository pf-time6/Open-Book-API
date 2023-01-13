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
const categories_entity_1 = __importDefault(require("../../entities/categories.entity"));
const errors_1 = require("../../errors");
const createCategoryService = (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryRepo = data_source_1.default.getRepository(categories_entity_1.default);
    const createdCategory = categoryRepo.create(categoryData);
    const alreadyExistCategory = yield categoryRepo.findOne({
        where: { name: categoryData.name },
    });
    if (alreadyExistCategory) {
        throw new errors_1.AppError("Category as already registred", 409);
    }
    yield categoryRepo.save(createdCategory);
    return createdCategory;
});
exports.default = createCategoryService;
//# sourceMappingURL=createCategories.service.js.map